'use client'

import Link from 'next/link'
import { useState } from 'react'

const faqs = [
  {
    q: 'How does Early work?',
    a: 'Early is an alarm clock app designed to help you build a consistent wake-up habit. Set an alarm for your desired wake-up time, and when it fires, you\'ll need to complete a mission — such as solving a math problem or doing push-ups — before the alarm is dismissed. Each successful wake-up adds to your streak.',
  },
  {
    q: 'Is Early free?',
    a: 'Yes. Early is free to download and use. All core features — alarms, missions, and streak tracking — are available at no cost.',
  },
  {
    q: "Why didn't my alarm go off?",
    a: 'There are a few common reasons: make sure notifications are enabled for Early in your device settings; on Android, disable battery optimization for Early and grant the "Schedule exact alarms" permission; on iPhone, ensure Do Not Disturb or Focus modes are not blocking Early. If problems persist, contact us.',
  },
  {
    q: 'How do streaks work?',
    a: 'Your streak counts the number of consecutive days you have successfully woken up with Early — meaning you completed the mission and dismissed the alarm. Missing a day resets your streak to zero, so stay consistent!',
  },
  {
    q: 'Can I use Early without an account?',
    a: 'Yes. Early works fully offline and without an account. Your alarms, missions, and streak data are stored locally on your device. If you want to sync your data across multiple devices, sign in with Google or Apple.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Settings inside the Early app, scroll to the bottom, and tap "Delete Account." Your account and all synced data will be permanently deleted within 30 days.',
  },
  {
    q: 'Does Early work on both iPhone and Android?',
    a: 'Yes. Early is available on both iOS (iPhone) and Android. You can download it from the App Store or Google Play.',
  },
  {
    q: 'I have another question.',
    a: 'We\'d love to hear from you. Send us an email at muhammadumar840777@gmail.com and we\'ll get back to you as soon as possible.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-medium text-black">{q}</span>
        <span className="flex-shrink-0 text-gray-400">
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-gray-500 leading-relaxed text-sm">
          {a.includes('muhammadumar840777@gmail.com') ? (
            <>
              {a.split('muhammadumar840777@gmail.com')[0]}
              <a
                href="mailto:muhammadumar840777@gmail.com"
                className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                muhammadumar840777@gmail.com
              </a>
              {a.split('muhammadumar840777@gmail.com')[1]}
            </>
          ) : (
            a
          )}
        </p>
      )}
    </div>
  )
}

export default function FAQPage() {
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

        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-500 mb-12">Everything you need to know about Early.</p>

        <div className="border-t border-gray-100">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-gray-50 text-center">
          <p className="text-sm text-gray-500 mb-1">Still have questions?</p>
          <a
            href="mailto:muhammadumar840777@gmail.com"
            className="text-sm font-medium text-black underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            muhammadumar840777@gmail.com
          </a>
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
