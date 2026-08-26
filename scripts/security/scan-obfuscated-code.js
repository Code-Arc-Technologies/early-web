#!/usr/bin/env node

/**
 * Scans JS/TS files for the specific obfuscation pattern found injected into
 * this project's config files in Aug 2026 (an "EtherHiding"-style malware
 * downloader appended after module.exports on a single, very long line).
 *
 * Usage:
 *   node scripts/security/scan-obfuscated-code.js            # scan all tracked files (CI)
 *   node scripts/security/scan-obfuscated-code.js --staged   # scan the git index (pre-commit)
 *
 * Exits non-zero and prints details if anything suspicious is found.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = execSync('git rev-parse --show-toplevel').toString().trim();
const SCAN_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);
const MAX_LINE_LENGTH = 1000;
const MIN_HEX_VAR_HITS = 5;

const EXCLUDED_PATH_SEGMENTS = [
  'node_modules/',
  '/dist/',
  '/build/',
  '/.expo/',
  '/.next/',
  'ios/Pods/',
  'ios/build/',
  'android/build/',
  'android/.gradle/',
  'android/app/build/',
  '/coverage/',
  '/vendor/',
  '/out/',
  '/.yarn/',
];

const HEX_VAR_RE = /_0x[0-9a-f]{4,8}\b/g;
const IOC_STRINGS = [
  "global.i=",
  "global.i =",
  "global['r']=require",
  'global["r"]=require',
  "global['r'] = require",
];

function loadIgnoreFile() {
  const ignorePath = path.join(REPO_ROOT, '.malwarescanignore');
  if (!fs.existsSync(ignorePath)) return [];
  return fs
    .readFileSync(ignorePath, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

// This file necessarily contains the marker strings/regexes as literals so
// it can check for them — exclude it from its own scan.
const SELF_PATH = path
  .relative(REPO_ROOT, __filename)
  .replace(/\\/g, '/');

function isExcluded(relPath, extraIgnores) {
  const normalized = relPath.replace(/\\/g, '/');
  if (normalized === SELF_PATH) return true;
  const withSlashes = `/${normalized}`;
  if (EXCLUDED_PATH_SEGMENTS.some((seg) => withSlashes.includes(seg))) return true;
  return extraIgnores.some((pattern) => withSlashes.includes(pattern));
}

function getCandidateFiles(staged) {
  const cmd = staged
    ? 'git diff --cached --name-only --diff-filter=ACMR'
    : 'git ls-files';
  const out = execSync(cmd, { cwd: REPO_ROOT }).toString();
  return out
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((f) => SCAN_EXTENSIONS.has(path.extname(f)));
}

function readContent(relPath, staged) {
  if (staged) {
    // Read exactly what's about to be committed (the index blob), not the
    // working-tree copy, in case they differ.
    try {
      return execSync(`git show :"${relPath}"`, { cwd: REPO_ROOT }).toString();
    } catch {
      return null; // e.g. deleted file
    }
  }
  const full = path.join(REPO_ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf8');
}

function scanFile(relPath, content) {
  const findings = [];
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (line.length > MAX_LINE_LENGTH) {
      findings.push({
        line: idx + 1,
        reason: `line is ${line.length} chars (limit ${MAX_LINE_LENGTH})`,
        snippet: line.slice(0, 160),
      });
    }
  });

  const hexHits = content.match(HEX_VAR_RE);
  if (hexHits && hexHits.length >= MIN_HEX_VAR_HITS) {
    findings.push({
      line: null,
      reason: `${hexHits.length} obfuscator-style "_0x..." identifiers found`,
      snippet: '',
    });
  }

  for (const ioc of IOC_STRINGS) {
    if (content.includes(ioc)) {
      findings.push({
        line: null,
        reason: `known malware marker string found: ${JSON.stringify(ioc)}`,
        snippet: '',
      });
    }
  }

  return findings;
}

function main() {
  const staged = process.argv.includes('--staged');
  const extraIgnores = loadIgnoreFile();
  const files = getCandidateFiles(staged).filter((f) => !isExcluded(f, extraIgnores));

  let hasFindings = false;

  for (const relPath of files) {
    const content = readContent(relPath, staged);
    if (content == null) continue;
    const findings = scanFile(relPath, content);
    if (findings.length === 0) continue;

    hasFindings = true;
    console.error(`\n\x1b[31m✖ Suspicious content in ${relPath}\x1b[0m`);
    for (const f of findings) {
      const loc = f.line ? `line ${f.line}` : 'file-wide';
      console.error(`  - [${loc}] ${f.reason}`);
      if (f.snippet) console.error(`    ${f.snippet}${f.snippet.length === 160 ? '…' : ''}`);
    }
  }

  if (hasFindings) {
    console.error(
      '\n\x1b[31mBlocked: this looks like the obfuscated malware payload previously found in this project (Aug 2026 incident).\x1b[0m',
    );
    console.error(
      'If this is a genuine false positive (e.g. an intentionally vendored minified file), add its path to .malwarescanignore at the repo root.\n',
    );
    process.exit(1);
  }

  process.exit(0);
}

main();
