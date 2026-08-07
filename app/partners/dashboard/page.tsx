'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface InfluencerRow {
  id: string
  name: string
  code: string
  total_earned: number
  paid_out: number
}

interface ConversionRow {
  id: string
  created_at: string
  amount: number
}

interface DashboardData {
  influencer: InfluencerRow | null
  usersReached: number
  paidConversions: number
  totalEarned: number
  pendingPayout: number
  recentConversions: ConversionRow[]
}

const emptyData: DashboardData = {
  influencer: null,
  usersReached: 0,
  paidConversions: 0,
  totalEarned: 0,
  pendingPayout: 0,
  recentConversions: [],
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [data, setData] = useState<DashboardData>(emptyData)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    async function init() {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !sessionData.session) {
          router.replace('/partners')
          return
        }

        const user = sessionData.session.user
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Partner')
        setUserEmail(user.email || '')

        // Fetch influencer row
        const { data: influencer, error: infError } = await supabase
          .from('influencers')
          .select('*')
          .eq('email', user.email)
          .single()

        if (infError && infError.code !== 'PGRST116') {
          // PGRST116 = row not found — tables may not exist yet
          setFetchError('Could not load influencer data. Please contact support.')
          setLoading(false)
          return
        }

        if (!influencer) {
          setData(emptyData)
          setLoading(false)
          return
        }

        // Fetch redemptions count
        const { count: redemptionsCount } = await supabase
          .from('referral_redemptions')
          .select('*', { count: 'exact', head: true })
          .eq('influencer_id', influencer.id)

        // Fetch paid conversions + total earned
        const { data: conversions } = await supabase
          .from('referral_conversions')
          .select('*')
          .eq('influencer_id', influencer.id)
          .order('created_at', { ascending: false })

        const conversionRows = (conversions as ConversionRow[] | null) ?? []
        const totalEarned = conversionRows.reduce((sum, c) => sum + (c.amount || 0), 0)
        const pendingPayout = Math.max(0, totalEarned - (influencer.paid_out || 0))

        setData({
          influencer,
          usersReached: redemptionsCount ?? 0,
          paidConversions: conversionRows.length,
          totalEarned,
          pendingPayout,
          recentConversions: conversionRows.slice(0, 10),
        })
      } catch {
        setFetchError('An unexpected error occurred. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/partners')
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      {/* Dashboard header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-black">
              Welcome, {userName}
            </h1>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            {data.influencer?.code && (
              <span className="text-xs font-mono font-medium bg-black text-white px-3 py-1 rounded-full">
                Code: {data.influencer.code}
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-black transition-colors border border-gray-200 px-3 py-1.5 rounded-lg"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {fetchError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100">
            <p className="text-sm text-red-600">{fetchError}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Users Reached" value={data.usersReached.toLocaleString()} />
          <StatCard label="Paid Conversions" value={data.paidConversions.toLocaleString()} />
          <StatCard label="Total Earned" value={`$${data.totalEarned.toFixed(2)}`} />
        </div>

        {/* Payout banner */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Pending Payout</p>
            <p className="text-2xl font-bold text-black">${data.pendingPayout.toFixed(2)}</p>
          </div>
          <Link
            href="/partners/payout"
            className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Request Payout
          </Link>
        </div>

        {/* Recent conversions */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-black">Recent Conversions</h2>
          </div>

          {data.recentConversions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-gray-400">No conversions yet. Share your code to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Event</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentConversions.map((conv) => (
                    <tr key={conv.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(conv.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-gray-700">User subscribed</td>
                      <td className="px-6 py-4 text-right font-medium text-black">${conv.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  )
}
