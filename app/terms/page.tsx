import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Early',
}

export default function TermsPage() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors mb-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: August 6, 2026</p>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">1. Use of the App</h2>
            <p className="text-gray-600 leading-relaxed">
              Early is provided for personal, non-commercial use only. By downloading or using the app, you agree to use it only for lawful purposes and in accordance with these Terms. You may not use Early in any way that could damage, disable, overburden, or impair our servers, or interfere with any other party&apos;s use of the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">2. Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              Creating an account is optional — you can use Early without signing in. If you do create an account, you are responsible for maintaining the security of your credentials and for all activities that occur under your account. Notify us immediately at{' '}
              <a href="mailto:muhammadumar840777@gmail.com" className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity">
                muhammadumar840777@gmail.com
              </a>{' '}
              if you suspect any unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">3. User Data</h2>
            <p className="text-gray-600 leading-relaxed">
              Your use of Early and how we handle your data is governed by our{' '}
              <Link href="/privacy" className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">4. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content, design, code, and materials in Early are owned by or licensed to us. You may not copy, modify, distribute, sell, or lease any part of Early, nor may you reverse-engineer or attempt to extract the source code, except as permitted by applicable law or with our explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed">
              Early is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that Early will be uninterrupted, error-free, or free of viruses. Alarm reliability depends on your device settings, operating system, and notification permissions — we cannot guarantee that every alarm will fire.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, missed appointments, or lost profits, arising from your use of or inability to use Early, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">7. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to suspend or terminate your access to Early at any time, without notice, if we believe you have violated these Terms or if we discontinue the service. You may stop using Early at any time. Upon termination, provisions that by their nature should survive (including intellectual property, disclaimers, and limitation of liability) will continue to apply.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">8. Changes to These Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may revise these Terms from time to time. When we make material changes, we will update the &quot;Last updated&quot; date at the top. Your continued use of Early after changes are posted means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">9. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms are governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in the jurisdiction where we operate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">10. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about these Terms? Reach us at:{' '}
              <a href="mailto:muhammadumar840777@gmail.com" className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity">
                muhammadumar840777@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-4 py-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2026 Early. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-black transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-black transition-colors">Terms</Link>
            <Link href="/faq" className="text-sm text-gray-400 hover:text-black transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
