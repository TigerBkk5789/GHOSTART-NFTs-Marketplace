import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { TipFeature } from "@/components/tip-feature"

export default async function TipPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            💝 Support GHOSTART
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Love the GHOSTART NFT marketplace? Send a tip to support development and help us build amazing features!
          </p>
        </div>

        {/* Tip Feature */}
        <div className="flex justify-center mb-8">
          <TipFeature 
            recipientAddress="0x32f1e35291967c07ec02aa81394dbf87d1d25e52"
            locale={locale} 
          />
        </div>

        {/* Why Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support cutting-edge NFT technology on World Chain
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Impact</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Help build the future of decentralized identity
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Exclusive Features</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get early access to new features and updates
              </p>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-center">About the Developer</h2>
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Building the future of NFT marketplaces on World Chain with World ID integration, 
              multi-token payments, and innovative features.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                World Chain Expert
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                NFT Developer
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                Web3 Builder
              </span>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Developer Wallet Address:
          </h3>
          <p className="font-mono text-sm bg-white dark:bg-gray-800 p-2 rounded border">
            0x32f1e35291967c07ec02aa81394dbf87d1d25e52
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            You can also send tips directly to this address using any World Chain wallet
          </p>
        </div>
      </div>
    </div>
  )
}
