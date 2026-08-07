import Link from 'next/link'

const features = [
  {
    title: 'Mission-based alarms',
    description:
      'Dismiss your alarm only after completing a mission — push-ups, math problems, or memory challenges. No more mindless snoozing.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Streak tracking',
    description:
      'See your consecutive wake-up days grow. Build momentum and turn early rising into an unbreakable habit.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Works offline',
    description:
      'Local-first design means Early works without internet. No account required to get started — your data stays on your device.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 sm:py-36 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block mb-6 px-3 py-1 text-xs font-medium tracking-widest uppercase bg-black text-white rounded-full">
            Available on iOS &amp; Android
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight mb-6">
            Wake Up Early.
            <br />
            Build the Habit.
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Early is the alarm app that makes waking up stick. Complete missions,
            build streaks, and transform your mornings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors w-56 justify-center"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-black text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors w-56 justify-center"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.65.19.98.07l12.49-7.19L13.39 13l-10.21 10.76zm-1.03-19.6C2.06 4.43 2 4.72 2 5.04v13.93c0 .32.06.61.15.87l.09.08L9.3 12.8v-.18L2.24 4.08l-.09.08zM19.4 10.37l-2.18-1.26-3.35 3.35 3.35 3.35 2.2-1.27c.63-.36.63-1.56-.02-1.92v-.25zM4.16.24L16.65 7.43l-3.26 3.26L4.16.24z" />
              </svg>
              Get it on Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Features */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-4">
            Everything you need to wake up earlier
          </h2>
          <p className="text-gray-500 text-center mb-14 max-w-lg mx-auto">
            Simple, focused features designed to break the snooze habit and build
            a consistent morning routine.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 hover:border-gray-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-black">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 py-20 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Start waking up earlier today
          </h2>
          <p className="text-gray-400 mb-8">
            Free to download. No account required to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors w-48 text-center"
            >
              App Store
            </a>
            <a
              href="#"
              className="border border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors w-48 text-center"
            >
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2026 Early. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-black transition-colors">
              Terms
            </Link>
            <Link href="/faq" className="text-sm text-gray-400 hover:text-black transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
