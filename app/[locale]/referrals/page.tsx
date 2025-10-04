import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { Footer } from "@/components/footer"
import { ShareInvite } from "@/components/share-invite"
import { ReferralStats } from "@/components/referral-stats"

export default async function ReferralsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎁 Referral Program
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Invite friends to GHOSTART and earn rewards together. Share your unique link and both of you get tokens!
          </p>
        </div>

        {/* Referral Stats */}
        <div className="mb-8">
          <ReferralStats locale={locale} />
        </div>

        {/* Share Invite */}
        <div className="flex justify-center mb-8">
          <ShareInvite locale={locale} />
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Your Link</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy your unique referral link and share it with friends
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• Unique 8-character code</p>
                <p>• Works on all platforms</p>
                <p>• Easy to share anywhere</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Friends Join</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your friends connect their World App wallet and verify identity
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• World ID verification</p>
                <p>• Secure wallet connection</p>
                <p>• Instant reward processing</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Earn Together</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Both you and your friend receive GHOSTART token rewards
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• You: 100 GHOSTART tokens</p>
                <p>• Friend: 50 GHOSTART + 1 NFT</p>
                <p>• Automatic crediting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Reward Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-600">Your Friend Gets:</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950 rounded">
                  <span className="text-green-500">🎁</span>
                  <span className="text-sm">50 GHOSTART tokens</span>
                  <span className="text-xs text-gray-500 ml-auto">Welcome bonus</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950 rounded">
                  <span className="text-green-500">🎨</span>
                  <span className="text-sm">1 Free NFT mint</span>
                  <span className="text-xs text-gray-500 ml-auto">Exclusive</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950 rounded">
                  <span className="text-green-500">🔒</span>
                  <span className="text-sm">World ID verification</span>
                  <span className="text-xs text-gray-500 ml-auto">Required</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-600">You Get:</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-950 rounded">
                  <span className="text-blue-500">💰</span>
                  <span className="text-sm">100 GHOSTART tokens</span>
                  <span className="text-xs text-gray-500 ml-auto">Per referral</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-950 rounded">
                  <span className="text-blue-500">📊</span>
                  <span className="text-sm">Referral tracking</span>
                  <span className="text-xs text-gray-500 ml-auto">Analytics</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-950 rounded">
                  <span className="text-blue-500">🎯</span>
                  <span className="text-sm">Maximum 10 referrals</span>
                  <span className="text-xs text-gray-500 ml-auto">Limit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for Success */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">💡 Tips for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Best Times to Share:</h4>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• After completing your first NFT mint</li>
                <li>• When you discover a cool collection</li>
                <li>• After earning your first rewards</li>
                <li>• During special events or drops</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Where to Share:</h4>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Crypto communities and Discord</li>
                <li>• Social media (Twitter, Telegram)</li>
                <li>• Friends interested in NFTs</li>
                <li>• World ID and Web3 communities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-2">Terms & Conditions</h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Rewards are credited after friend completes World ID verification</p>
            <p>• Maximum 10 referrals per user to prevent abuse</p>
            <p>• Referral rewards are non-transferable</p>
            <p>• GHOSTART reserves the right to modify terms at any time</p>
            <p>• All rewards subject to World Chain network conditions</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


