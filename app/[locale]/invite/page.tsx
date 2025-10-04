import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { Footer } from "@/components/footer"
import { InviteHandler } from "@/components/invite-handler"

export default async function InvitePage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const { code } = await searchParams
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎁 You're Invited to GHOSTART!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join the GHOSTART NFT marketplace and get exclusive rewards for both you and your friend!
          </p>
        </div>

        {/* Invite Handler */}
        <div className="flex justify-center mb-8">
          <InviteHandler referralCode={code as string} locale={locale} />
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Your Welcome Bonus</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get 50 GHOSTART tokens + 1 free NFT mint when you join via invite
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• 50 GHOSTART tokens</p>
                <p>• 1 free NFT mint</p>
                <p>• Access to exclusive collections</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Your Friend's Reward</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your friend gets 100 GHOSTART tokens for inviting you
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• 100 GHOSTART tokens</p>
                <p>• Referral bonus credited</p>
                <p>• Thank you notification</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">How the Referral System Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Friend Invites You</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your friend shares their unique invite link with you
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">You Join & Verify</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect your World App wallet and verify your identity
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Both Get Rewards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You both receive your rewards automatically
              </p>
            </div>
          </div>
        </div>

        {/* World Chain Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Why Join GHOSTART on World Chain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-blue-500">🌍</span>
              <div>
                <h4 className="font-semibold">World ID Verification</h4>
                <p className="text-gray-600 dark:text-gray-400">Prove you're a unique human with World ID</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500">🆓</span>
              <div>
                <h4 className="font-semibold">Free NFT Minting</h4>
                <p className="text-gray-600 dark:text-gray-400">Mint NFTs for free with minimal fees</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500">🔒</span>
              <div>
                <h4 className="font-semibold">Secure & Fast</h4>
                <p className="text-gray-600 dark:text-gray-400">Built on World Chain's secure infrastructure</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">⚡</span>
              <div>
                <h4 className="font-semibold">Low Fees</h4>
                <p className="text-gray-600 dark:text-gray-400">Optimized for cost-effective transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


