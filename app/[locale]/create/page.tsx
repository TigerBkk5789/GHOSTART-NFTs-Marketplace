import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { Footer } from "@/components/footer"
import { CreateInterface } from "@/components/create-interface"
import { MyNFTs } from "@/components/my-nfts"

export default async function CreatePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 Create NFT Collection
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create your own NFT collection, manage your NFTs, and mint ERC-721 tokens on World Chain
          </p>
        </div>

        {/* Create Interface */}
        <div className="flex justify-center mb-8">
          <CreateInterface locale={locale} />
        </div>

        {/* My NFTs Section */}
        <div className="mb-8">
          <MyNFTs locale={locale} />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Collection Creation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create and manage your own NFT collections with custom metadata
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• Custom collection names</p>
                <p>• Unique descriptions</p>
                <p>• Creator attribution</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">My NFTs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View and manage all your created and owned NFTs
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• View your collections</p>
                <p>• Track ownership</p>
                <p>• Manage metadata</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">ERC-721 Integration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full ERC-721 smart contract integration for free minting
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• Standard compliance</p>
                <p>• World Chain optimized</p>
                <p>• Free minting support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-center">Creator Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">World App Wallet</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Must connect with World App wallet for identity verification
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs">
                • World ID verification required<br/>
                • Unique human identity<br/>
                • Secure wallet connection<br/>
                • Creator name registration
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Smart Contract Features</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Full ERC-721 compliance with World Chain optimization
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs">
                • ERC-721 standard compliance<br/>
                • Free minting capability<br/>
                • Creator registration system<br/>
                • World App wallet integration
              </div>
            </div>
          </div>
        </div>

        {/* World Chain Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Why Create on World Chain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-blue-500">🌍</span>
              <div>
                <h4 className="font-semibold">Global Identity</h4>
                <p className="text-gray-600 dark:text-gray-400">World ID ensures authentic creators and prevents spam</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500">🆓</span>
              <div>
                <h4 className="font-semibold">Free Minting</h4>
                <p className="text-gray-600 dark:text-gray-400">Mint NFTs for free with minimal app fees</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-500">🔒</span>
              <div>
                <h4 className="font-semibold">Secure</h4>
                <p className="text-gray-600 dark:text-gray-400">Built on World Chain's secure infrastructure</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500">⚡</span>
              <div>
                <h4 className="font-semibold">Fast & Cheap</h4>
                <p className="text-gray-600 dark:text-gray-400">Optimized for speed and low transaction costs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


