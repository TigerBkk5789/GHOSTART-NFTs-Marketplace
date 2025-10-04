import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { Footer } from "@/components/footer"
import { MintInterface } from "@/components/mint-interface"

export default async function MintPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 Mint GHOSTART NFTs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create your unique NFTs on World Chain with paid minting, app fees, and free mint options
          </p>
        </div>

        {/* Mint Interface */}
        <div className="flex justify-center mb-8">
          <MintInterface locale={locale} />
        </div>

        {/* Minting Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🆓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Mint</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mint NFTs for free with World App wallet verification
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• 1 free mint per address</p>
                <p>• World App verification required</p>
                <p>• Small app fee applies</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Paid Mint</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mint premium NFTs with additional features
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• Premium NFT features</p>
                <p>• Higher rarity chances</p>
                <p>• Custom metadata support</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">App Fees</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Small fees to support platform development
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>• 0.0001 ETH per mint</p>
                <p>• Supports development</p>
                <p>• World Chain optimized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Contract Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-center">Smart Contract Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Free Mint Contract</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                ERC-721 compliant contract for free NFT minting
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs font-mono">
                Contract: GhostArtFreeMint.sol<br/>
                Max Supply: 5,000 NFTs<br/>
                Free Mints: 1 per address<br/>
                App Fee: 0.0001 ETH
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Paid Mint Contract</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                ERC-721 contract for premium NFT minting
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs font-mono">
                Contract: GhostArtNFT.sol<br/>
                Max Supply: 10,000 NFTs<br/>
                Mint Price: 0.001 ETH<br/>
                Free Allocation: 1,000 NFTs
              </div>
            </div>
          </div>
        </div>

        {/* World Chain Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Why Mint on World Chain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-blue-500">🌍</span>
              <div>
                <h4 className="font-semibold">Global Identity</h4>
                <p className="text-gray-600 dark:text-gray-400">World ID verification ensures unique human creators</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500">⚡</span>
              <div>
                <h4 className="font-semibold">Low Fees</h4>
                <p className="text-gray-600 dark:text-gray-400">Optimized for cost-effective NFT minting</p>
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
              <span className="text-orange-500">🚀</span>
              <div>
                <h4 className="font-semibold">Fast</h4>
                <p className="text-gray-600 dark:text-gray-400">Quick transaction confirmation times</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


