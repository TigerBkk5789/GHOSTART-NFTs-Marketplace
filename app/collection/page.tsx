'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  Grid3X3,
  List,
  Search,
  Filter,
  SortAsc,
  Star,
  Heart,
  Share2,
  Download,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Users,
  Eye,
  Clock,
  Zap,
  Shield,
  Globe,
  Coins,
  Activity,
  ChevronDown,
  ChevronRight,
  Plus,
  RefreshCw
} from 'lucide-react';
import Image from 'next/image';

export default function CollectionPage() {
  const { address, isConnected } = useAccount();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [nfts, setNfts] = useState<any[]>([]);
  const [filteredNFTs, setFilteredNFTs] = useState<any[]>([]);
  const [collectionStats, setCollectionStats] = useState({
    totalSupply: 10000,
    floorPrice: 0.1,
    volume: 1200,
    owners: 2500,
    listed: 150,
    floorChange: 12.5
  });

  useEffect(() => {
    fetchNFTs();
  }, []);

  useEffect(() => {
    if (nfts.length > 0) {
      let filtered = nfts.filter(nft => 
        nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply filters
      if (filterBy !== 'all') {
        filtered = filtered.filter(nft => nft.status === filterBy);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.priceWLD - b.priceWLD);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.priceWLD - a.priceWLD);
          break;
        case 'recent':
          filtered.sort((a, b) => b.id - a.id);
          break;
        case 'oldest':
          filtered.sort((a, b) => a.id - b.id);
          break;
      }

      setFilteredNFTs(filtered);
    }
  }, [searchQuery, nfts, sortBy, filterBy]);

  const fetchNFTs = async () => {
    try {
      const response = await fetch('/api/nfts');
      const data = await response.json();
      setNfts(data);
    } catch (err) {
      console.error('NFT fetch error:', err);
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

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
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GHOSTART Collection</span>
                <p className="text-xs text-gray-600">NFT Marketplace</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <RefreshCw size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Collection Hero */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6 border border-blue-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <Image 
                  src="/ghostart-cryptocurrency-coin-logo.jpg"
                  alt="GHOSTART Collection"
                  width={120}
                  height={120}
                  className="relative z-10 rounded-2xl shadow-2xl"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">GHOSTART NFTs</h1>
                <p className="text-gray-600 mb-4">A unique collection of digital art on World Chain</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Verified Collection</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500" size={16} />
                    <span className="text-sm font-semibold text-gray-900">4.8</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
                <Heart size={16} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">1.2K</span>
              </button>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all">
                <Plus size={16} />
                <span>Follow</span>
              </button>
            </div>
          </div>

          {/* Collection Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatNumber(collectionStats.totalSupply)}</p>
              <p className="text-sm text-gray-600">Total Supply</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{collectionStats.floorPrice} WLD</p>
              <p className="text-sm text-gray-600">Floor Price</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatNumber(collectionStats.volume)} WLD</p>
              <p className="text-sm text-gray-600">Volume</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatNumber(collectionStats.owners)}</p>
              <p className="text-sm text-gray-600">Owners</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{collectionStats.listed}</p>
              <p className="text-sm text-gray-600">Listed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">+{collectionStats.floorChange}%</p>
              <p className="text-sm text-gray-600">Floor Change</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-3">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="all">All Items</option>
                <option value="listed">Listed</option>
                <option value="unlisted">Unlisted</option>
                <option value="sold">Sold</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="oldest">Oldest First</option>
              </select>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
              >
                {viewMode === 'grid' ? <List size={20} className="text-gray-600" /> : <Grid3X3 size={20} className="text-gray-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">NFTs ({filteredNFTs.length})</h2>
            <p className="text-sm text-gray-600">Showing {filteredNFTs.length} of {nfts.length} items</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
              <SortAsc size={20} className="text-gray-600" />
            </button>
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
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      #{nft.tokenId}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{nft.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">by {nft.creator}</p>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-sm text-gray-600">Price</span>
                      <p className="font-bold text-blue-600">{nft.priceWLD} WLD</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">Likes</span>
                      <p className="font-semibold text-gray-900">{nft.likes}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all">
                      Buy Now
                    </button>
                    <button className="p-2 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
                      <ExternalLink size={16} className="text-gray-600" />
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
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilterBy('all');
                setSortBy('recent');
              }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredNFTs.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white border border-blue-200 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-gray-900 transition-all">
              Load More NFTs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
