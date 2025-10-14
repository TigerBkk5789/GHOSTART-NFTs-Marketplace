'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { 
  Wallet, 
  Eye, 
  EyeOff, 
  Copy, 
  ExternalLink, 
  Settings, 
  Plus, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  Share2,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  BarChart3,
  Coins,
  Users,
  Activity,
  Bell,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import Image from 'next/image';

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('nfts');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [wldBalance, setWldBalance] = useState(0);
  const [ghostartBalance, setGhostartBalance] = useState(0);
  const [nfts, setNfts] = useState<any[]>([]);
  const [filteredNFTs, setFilteredNFTs] = useState<any[]>([]);

  useEffect(() => {
    if (address) {
      fetchBalances();
      fetchNFTs();
    }
  }, [address]);

  useEffect(() => {
    if (nfts.length > 0) {
      const filtered = nfts.filter(nft => 
        nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNFTs(filtered);
    }
  }, [searchQuery, nfts]);

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

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (balance: number) => {
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`;
    } else if (balance >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`;
    }
    return balance.toFixed(2);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="text-white" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-8">Connect your wallet to view your GHOSTART NFTs and manage your digital assets.</p>
          <button
            onClick={() => setShowWalletModal(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            Connect Wallet
          </button>
        </div>

        {/* Wallet Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl max-w-md w-full p-8 border border-blue-200 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Connect Wallet</h2>
                <button onClick={() => setShowWalletModal(false)} className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                {connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => {
                      connect({ connector });
                      setShowWalletModal(false);
                    }}
                    className="w-full flex items-center justify-between p-6 bg-white border border-blue-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
                  >
                    <span className="font-semibold text-lg text-gray-900">{connector.name}</span>
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform text-gray-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/50 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                <Image 
                  src="/ghostart-cryptocurrency-coin-logo.jpg"
                  alt="GHOSTART"
                  width={40}
                  height={40}
                  className="relative z-10 rounded-full shadow-2xl"
                />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GHOSTART Wallet</span>
                <p className="text-xs text-gray-600">NFT Collection</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
              >
                {showBalance ? <Eye size={20} className="text-gray-600" /> : <EyeOff size={20} className="text-gray-600" />}
              </button>
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Wallet Overview */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-blue-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet Overview</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Connected to World Chain</span>
              </div>
            </div>
            <button
              onClick={copyAddress}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-sm font-semibold text-blue-600">{formatAddress(address!)}</span>
              <Copy size={16} className="text-blue-600" />
            </button>
          </div>

          {/* Balance Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Coins className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">WLD Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {showBalance ? formatBalance(wldBalance) : '••••••'}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <ExternalLink size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Image 
                      src="/ghostart-cryptocurrency-coin-logo.jpg"
                      alt="GHOSTART"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">$GHOSTART</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {showBalance ? formatBalance(ghostartBalance) : '••••••'}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <ExternalLink size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-1 bg-blue-50 p-1 rounded-xl">
            {[
              { id: 'nfts', label: 'NFTs', icon: Grid3X3 },
              { id: 'tokens', label: 'Tokens', icon: Coins },
              { id: 'activity', label: 'Activity', icon: Activity },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              {viewMode === 'grid' ? <List size={20} className="text-gray-600" /> : <Grid3X3 size={20} className="text-gray-600" />}
            </button>
            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search NFTs, collections, or addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Content based on active tab */}
        {activeTab === 'nfts' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total NFTs</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredNFTs.length}</p>
                  </div>
                  <Grid3X3 className="text-blue-500" size={24} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Collections</p>
                    <p className="text-2xl font-bold text-gray-900">1</p>
                  </div>
                  <Star className="text-indigo-500" size={24} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Floor Price</p>
                    <p className="text-2xl font-bold text-gray-900">0.1 WLD</p>
                  </div>
                  <TrendingUp className="text-green-500" size={24} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Volume</p>
                    <p className="text-2xl font-bold text-gray-900">1.2K WLD</p>
                  </div>
                  <BarChart3 className="text-cyan-500" size={24} />
                </div>
              </div>
            </div>

            {/* NFT Grid/List */}
            {filteredNFTs.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                {filteredNFTs.map((nft) => (
                  <div key={nft.id} className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all border border-blue-200 group">
                    <div className="aspect-square relative">
                      <Image 
                        src={nft.image} 
                        alt={nft.name} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                            <Heart size={16} className="text-gray-600" />
                          </button>
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                            <Share2 size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{nft.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">by {nft.creator}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-600">Price</span>
                          <p className="font-bold text-blue-600">{nft.priceWLD} WLD</p>
                        </div>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid3X3 className="text-blue-500" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No NFTs Found</h3>
                <p className="text-gray-600 mb-6">Start collecting GHOSTART NFTs to see them here</p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all">
                  Explore Marketplace
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Token Balances</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Coins className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WLD</p>
                      <p className="text-sm text-gray-600">World Token</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{showBalance ? formatBalance(wldBalance) : '••••••'}</p>
                    <p className="text-sm text-gray-600">$0.00</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Image 
                        src="/ghostart-cryptocurrency-coin-logo.jpg"
                        alt="GHOSTART"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">$GHOSTART</p>
                      <p className="text-sm text-gray-600">GHOSTART Token</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{showBalance ? formatBalance(ghostartBalance) : '••••••'}</p>
                    <p className="text-sm text-gray-600">$0.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="text-center py-8">
                <Activity className="text-gray-400 mx-auto mb-4" size={48} />
                <p className="text-gray-600">No recent activity</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Wallet Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="text-blue-500" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Security</p>
                      <p className="text-sm text-gray-600">Manage your wallet security</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bell className="text-blue-500" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Notifications</p>
                      <p className="text-sm text-gray-600">Configure notification preferences</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="text-blue-500" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Help & Support</p>
                      <p className="text-sm text-gray-600">Get help with your wallet</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-red-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <LogOut className="text-red-500" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Disconnect Wallet</p>
                      <p className="text-sm text-gray-600">Sign out of your wallet</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => disconnect()}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
