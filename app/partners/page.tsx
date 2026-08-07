'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function PartnersPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError(null)

    try {
      const { error: supabaseError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/partners/dashboard`,
        },
      })

      if (supabaseError) {
        throw supabaseError
      }

      setSent(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {/* Logo / header */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-black">Early</span>
          <h1 className="mt-2 text-xl font-semibold text-black">Partner Portal</h1>
          <p className="mt-1 text-sm text-gray-500">Early Influencer Dashboard</p>
        </div>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-black mb-2">Check your email!</h2>
            <p className="text-sm text-gray-500">
              We sent a login link to{' '}
              <span className="font-medium text-black">{email}</span>.
              <br />
              Click the link in the email to access your dashboard.
            </p>
            <button
              className="mt-6 text-sm text-gray-400 hover:text-black transition-colors underline underline-offset-2"
              onClick={() => { setSent(false); setEmail('') }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>

            <p className="text-center text-xs text-gray-400 pt-1">
              We&apos;ll send you a login link — no password needed.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
