export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          GHOSTART NFT Marketplace
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🚀 Welcome to GHOSTART</h2>
            <p className="text-gray-600 mb-4">
              Your gateway to the world of NFTs on World Chain. Trade, mint, and collect unique digital art.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Connected to World Chain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">WLD Token Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Free NFT Minting</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🎨 Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all">
                Browse NFTs
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                Mint NFT (FREE)
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">🌟 Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-purple-50">
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="font-semibold">Secure Trading</h3>
              <p className="text-sm text-gray-600">All transactions secured by smart contracts</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold">Fast & Cheap</h3>
              <p className="text-sm text-gray-600">Low gas fees on World Chain</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="font-semibold">Free Minting</h3>
              <p className="text-sm text-gray-600">Create NFTs without gas fees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
