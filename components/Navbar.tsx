'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black tracking-tight">
            Early
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">
              Terms
            </Link>
            <Link
              href="/partners"
              className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Partner Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-600 hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
            <Link
              href="/faq"
              className="text-sm text-gray-600 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Terms
            </Link>
            <Link
              href="/partners"
              className="text-sm bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors w-fit"
              onClick={() => setMenuOpen(false)}
            >
              Partner Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
