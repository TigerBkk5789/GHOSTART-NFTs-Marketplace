'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, Upload, Search, Filter, X, ExternalLink, AlertCircle, Loader, TrendingUp, Coins } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [wldBalance, setWldBalance] = useState(0);
  const [ghostartBalance, setGhostartBalance] = useState(0);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    fetchBlockNumber();
    fetchNFTs();
    const interval = setInterval(fetchBlockNumber, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (address) {
      fetchBalances();
    }
  }, [address]);

  const fetchBlockNumber = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'eth_blockNumber'
        })
      });
      const data = await response.json();
      if (data.result) {
        setBlockNumber(parseInt(data.result, 16));
      }
    } catch (err) {
      console.error('Block fetch error:', err);
    }
  };

  const fetchBalances = async () => {
    if (!address) return;
    
    try {
      const response = await fetch('/api/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });
      const data = await response.json();
      setWldBalance(data.wld || 0);
      setGhostartBalance(data.ghostart || 0);
    } catch (err) {
      console.error('Balance fetch error:', err);
    }
  };

  const fetchNFTs = async () => {
    try {
      const response = await fetch('/api/nfts');
      const data = await response.json();
      setNfts(data);
    } catch (err) {
      console.error('NFT fetch error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="w-full h-24 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 relative">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-4 h-full flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                <Image 
                  src="/ghostart-cryptocurrency-coin-logo.jpg"
                  alt="GHOSTART Logo" 
                  width={48}
                  height={48}
                  className="rounded-full relative z-10 shadow-2xl"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-lg">GHOSTART</h1>
                <p className="text-white/90 text-xs">NFT Marketplace</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {blockNumber && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-semibold">#{blockNumber.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto">
              {[
                { id: 'explore', label: 'Explore' },
                { id: 'create', label: 'Create' },
                { id: 'myNFTs', label: 'My NFTs' },
                { id: 'activity', label: 'Activity' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Token Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image 
                  src="/ghostart-cryptocurrency-coin-logo.jpg"
                  alt="GHOSTART Token" 
                  width={32}
                  height={32}
                  className="rounded-full border border-white shadow-lg"
                />
                <div>
                  <p className="font-bold text-sm">$GHOSTART</p>
                  <p className="text-xs opacity-90">Market Cap: 1,850 WLD</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-white/30 rounded-full h-1.5">
                      <div className="bg-white rounded-full h-1.5" style={{width: '92.5%'}}></div>
                    </div>
                    <span className="text-xs font-bold">92.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'explore' && (
          <>
            {/* Search and Filters */}
            <div className="mb-6 flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={16} className="inline mr-2" />
                Filters
              </button>
            </div>

            {/* Wallet Connection */}
            {!isConnected ? (
              <div className="mb-6 border-2 border-dashed border-purple-300 rounded-xl p-6 text-center bg-white">
                <Wallet className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-gray-600 mb-4">Connect to explore and trade NFTs</p>
                <button 
                  onClick={() => setShowWalletModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {address?.slice(2, 4).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </p>
                      <div className="flex space-x-3 text-xs">
                        <span className="text-purple-600 font-semibold">{wldBalance.toFixed(2)} WLD</span>
                        <span className="text-blue-600 font-semibold">{Math.floor(ghostartBalance).toLocaleString()} GHOST</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => disconnect()}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}

            {/* NFT Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nfts.length > 0 ? nfts.map((nft) => (
                <div key={nft.id} className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-square relative">
                    <Image 
                      src={nft.image} 
                      alt={nft.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{nft.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">by {nft.creator}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-semibold">Price:</span>
                        <p className="font-bold text-purple-600">{nft.priceWLD} WLD</p>
                      </div>
                      <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-blue-600 transition-all">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 text-center py-12">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No NFTs Available</h3>
                  <p className="text-gray-500">Check back soon for new collections!</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'create' && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Mint Your NFT</h2>
              <p className="text-gray-600 mb-6">Create and mint your own NFT on World Chain</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
                <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                <p className="text-sm text-gray-600">Upload your artwork</p>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-600 hover:to-blue-600 transition-all">
                Mint NFT (FREE)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'myNFTs' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your NFT Collection</h3>
            <p className="text-gray-500 mb-4">
              {isConnected ? 'No NFTs found in your collection' : 'Connect wallet to view your NFTs'}
            </p>
            {!isConnected && (
              <button 
                onClick={() => setShowWalletModal(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Connect Wallet
              </button>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Activity Feed</h3>
            <p className="text-gray-500">Your recent transactions and activities will appear here</p>
          </div>
        )}
      </main>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Connect Wallet</h3>
              <button 
                onClick={() => setShowWalletModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  className="w-full p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  onClick={() => {
                    connect({ connector });
                    setShowWalletModal(false);
                  }}
                >
                  <span className="font-semibold">{connector.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
