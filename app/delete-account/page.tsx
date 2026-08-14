import Link from 'next/link'

export const metadata = {
  title: 'Delete Account — Early',
}

export default function DeleteAccountPage() {
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

        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">Delete Your Account</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: August 14, 2026</p>

        <div className="prose prose-gray max-w-none space-y-10">

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">How to Delete Your Account</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can permanently delete your Early account and all associated data directly from within the app. Follow these steps:
            </p>
            <ol className="list-decimal list-outside pl-5 space-y-3 text-gray-600">
              <li>Open the <strong className="text-black">Early</strong> app on your device.</li>
              <li>Tap the <strong className="text-black">Profile</strong> or <strong className="text-black">Settings</strong> icon.</li>
              <li>Scroll down and tap <strong className="text-black">Delete Account</strong>.</li>
              <li>Confirm the deletion when prompted.</li>
            </ol>
            <p className="text-gray-600 leading-relaxed mt-4">
              Your account and all data will be permanently deleted immediately upon confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">What Gets Deleted</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              When you delete your account, the following data is permanently and immediately removed from our servers:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-600">
              <li>Your profile information (name, email address, profile picture)</li>
              <li>All alarm configurations and settings</li>
              <li>Your streak records and mission history</li>
              <li>Your onboarding preferences and app settings</li>
              <li>Any other data associated with your account</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Data stored only on your device (if you used Early without signing in) is removed when you uninstall the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">What Is Not Deleted</h2>
            <p className="text-gray-600 leading-relaxed">
              For our records, we retain a minimal log entry containing your user ID, email address, and the date of deletion. This is kept solely for abuse prevention and legal compliance purposes and is not used for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">Re-registering After Deletion</h2>
            <p className="text-gray-600 leading-relaxed">
              After deleting your account, you can create a new Early account at any time using the same or a different email address. Your previous data cannot be recovered once deleted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">Need Help?</h2>
            <p className="text-gray-600 leading-relaxed">
              If you are unable to access the app or need assistance deleting your account, please contact us at:{' '}
              <a href="mailto:muhammadumar840777@gmail.com" className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity">
                muhammadumar840777@gmail.com
              </a>
              {' '}and we will process your request within 7 business days.
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
