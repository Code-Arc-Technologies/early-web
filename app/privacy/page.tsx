import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Early',
}

export default function PrivacyPage() {
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

        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: August 6, 2026</p>

        <div className="prose prose-gray max-w-none space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We collect the following types of information when you use Early:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-600">
              <li>
                <strong className="text-black">Account Information:</strong> When you sign in with Google or Apple, we receive your name and email address from that provider. We do not store your password — authentication is handled entirely by the provider.
              </li>
              <li>
                <strong className="text-black">Alarm &amp; Usage Data:</strong> Your alarm configurations, wake-up times, streak counts, and mission completion history are stored locally on your device. If you choose to sign in, this data may be synced to our servers.
              </li>
              <li>
                <strong className="text-black">Device Permissions:</strong> Early may request notification permissions (required for alarms) and motion permissions (for physical missions). We do not request access to your camera or microphone, and no audio or video is ever stored.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-600">
              <li>To provide and improve the app&apos;s core features, including alarm scheduling, missions, and streak tracking.</li>
              <li>To sync your data across devices when you are signed in.</li>
              <li>To send alarm notifications at the times you have scheduled.</li>
              <li>To respond to support requests if you contact us directly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">3. Data Storage &amp; Security</h2>
            <p className="text-gray-600 leading-relaxed">
              When syncing is enabled, your data is stored on servers provided by Supabase, hosted on Amazon Web Services (AWS). Data is encrypted in transit using TLS and encrypted at rest. On-device data is stored using encrypted local storage. We take reasonable technical and organizational measures to protect your information, but no method of transmission or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">4. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Early uses the following third-party services:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-600">
              <li><strong className="text-black">Supabase</strong> — database and authentication infrastructure.</li>
              <li><strong className="text-black">Google Sign-In / Apple Sign-In</strong> — optional third-party authentication.</li>
              <li><strong className="text-black">Expo</strong> — the platform used to build and distribute the app.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">5. Data Retention &amp; Deletion</h2>
            <p className="text-gray-600 leading-relaxed">
              You can delete your account at any time from the app&apos;s Settings screen. Upon deletion, your personal data and synced alarm data will be permanently removed from our servers within 30 days. Data stored only on your device is removed when you uninstall the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">6. Children&apos;s Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Early is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will take steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">7. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of Early after changes are posted constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">8. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us at:{' '}
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
