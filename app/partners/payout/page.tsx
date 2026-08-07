'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type PaymentMethod = 'paypal' | 'bank_transfer'

export default function PayoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(0)
  const [influencerId, setInfluencerId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const [method, setMethod] = useState<PaymentMethod>('paypal')

  // PayPal fields
  const [paypalEmail, setPaypalEmail] = useState('')

  // Bank transfer fields
  const [accountHolder, setAccountHolder] = useState('')
  const [iban, setIban] = useState('')
  const [bankName, setBankName] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function init() {
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        router.replace('/partners')
        return
      }

      const user = sessionData.session.user
      setUserId(user.id)

      // Fetch influencer data
      const { data: influencer } = await supabase
        .from('influencers')
        .select('id, total_earned, paid_out')
        .eq('email', user.email)
        .single()

      if (influencer) {
        setInfluencerId(influencer.id)
        const balance = Math.max(0, (influencer.total_earned || 0) - (influencer.paid_out || 0))
        setAvailable(balance)
      }

      setLoading(false)
    }

    init()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (available <= 0) return

    setSubmitting(true)
    setError(null)

    const payload: Record<string, unknown> = {
      influencer_id: influencerId,
      user_id: userId,
      amount: available,
      payment_method: method,
      status: 'pending',
      created_at: new Date().toISOString(),
    }

    if (method === 'paypal') {
      payload.paypal_email = paypalEmail
    } else {
      payload.account_holder = accountHolder
      payload.iban = iban
      payload.bank_name = bankName
    }

    try {
      const { error: insertError } = await supabase
        .from('payout_requests')
        .insert([payload])

      if (insertError) throw insertError

      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit payout request. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-gray-50 px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-black mb-2">Payout Requested!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your payout request for{' '}
            <span className="font-medium text-black">${available.toFixed(2)}</span> has been
            submitted. We&apos;ll process it within 5–7 business days.
          </p>
          <Link
            href="/partners/dashboard"
            className="inline-block bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 px-4 py-10">
      <div className="max-w-lg mx-auto w-full">
        {/* Back link */}
        <Link
          href="/partners/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h1 className="text-xl font-semibold text-black mb-1">Request Payout</h1>
          <p className="text-sm text-gray-500 mb-6">
            Available balance:{' '}
            <span className="font-semibold text-black">${available.toFixed(2)}</span>
          </p>

          {available <= 0 && (
            <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
              <p className="text-sm text-gray-500">You have no balance available for payout yet.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Payment method selector */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                {(['paypal', 'bank_transfer'] as PaymentMethod[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      method === m
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {m === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                  </button>
                ))}
              </div>
            </div>

            {/* PayPal fields */}
            {method === 'paypal' && (
              <div>
                <label htmlFor="paypal-email" className="block text-sm font-medium text-black mb-1.5">
                  PayPal Email
                </label>
                <input
                  id="paypal-email"
                  type="email"
                  required
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="paypal@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
              </div>
            )}

            {/* Bank transfer fields */}
            {method === 'bank_transfer' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="account-holder" className="block text-sm font-medium text-black mb-1.5">
                    Account Holder Name
                  </label>
                  <input
                    id="account-holder"
                    type="text"
                    required
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="Full name on account"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="iban" className="block text-sm font-medium text-black mb-1.5">
                    IBAN
                  </label>
                  <input
                    id="iban"
                    type="text"
                    required
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    placeholder="e.g. GB29 NWBK 6016 1331 9268 19"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="bank-name" className="block text-sm font-medium text-black mb-1.5">
                    Bank Name
                  </label>
                  <input
                    id="bank-name"
                    type="text"
                    required
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. Barclays, Chase"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || available <= 0}
              className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Request Payout'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
