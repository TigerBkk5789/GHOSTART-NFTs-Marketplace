'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { 
  ArrowLeft,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Copy,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  Clock,
  Shield,
  Globe,
  Zap,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Eye,
  Activity,
  Coins,
  Grid3X3,
  List,
  Filter,
  Search
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface NFTDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function NFTDetailPage({ params }: NFTDetailPageProps) {
  const { address, isConnected } = useAccount();
  const [nft, setNft] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [relatedNFTs, setRelatedNFTs] = useState<any[]>([]);

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch('/api/nfts');
        const data = await response.json();
        const nftData = data.find((item: any) => item.id.toString() === resolvedParams.id);
        setNft(nftData);
        
        // Get related NFTs (same collection)
        const related = data.filter((item: any) => 
          item.id !== nftData?.id && item.collection === nftData?.collection
        ).slice(0, 4);
        setRelatedNFTs(related);
      } catch (err) {
        console.error('NFT fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [params]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Grid3X3 className="text-blue-500" size={32} />
          </div>
          <p className="text-gray-600">Loading NFT details...</p>
        </div>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3X3 className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">NFT Not Found</h2>
          <p className="text-gray-600 mb-6">The NFT you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/collection"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/50 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link 
                href="/collection"
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                  <Image 
                    src="/ghostart-cryptocurrency-coin-logo.jpg"
                    alt="GHOSTART"
                    width={32}
                    height={32}
                    className="relative z-10 rounded-full shadow-2xl"
                  />
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GHOSTART NFT</span>
                  <p className="text-xs text-gray-600">#{nft.tokenId}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Share2 size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Download size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* NFT Image */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-200">
              <Image 
                src={nft.image} 
                alt={nft.name} 
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="flex space-x-2">
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Actions */}
            <div className="flex space-x-3">
              <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 py-3 px-4 rounded-lg transition-colors">
                <Download size={16} className="text-blue-600" />
                <span className="font-semibold text-blue-600">Download</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 bg-indigo-50 hover:bg-indigo-100 py-3 px-4 rounded-lg transition-colors">
                <ExternalLink size={16} className="text-indigo-600" />
                <span className="font-semibold text-indigo-600">View on Explorer</span>
              </button>
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{nft.name}</h1>
              <p className="text-gray-600 mb-4">by {nft.creator}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Verified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500" size={16} />
                  <span className="text-sm font-semibold text-gray-900">4.8</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="text-red-500" size={16} />
                  <span className="text-sm font-semibold text-gray-900">{nft.likes}</span>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="bg-white rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Current Price</p>
                  <p className="text-3xl font-bold text-gray-900">{nft.priceWLD} WLD</p>
                  <p className="text-sm text-gray-600">≈ $0.00 USD</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Last Sale</p>
                  <p className="text-lg font-semibold text-gray-900">{nft.priceWLD} WLD</p>
                  <p className="text-sm text-green-600">+12.5%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <span className="px-4 py-2 bg-blue-50 rounded-lg font-semibold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg">
                  Buy Now for {(nft.priceWLD * quantity).toFixed(2)} WLD
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 px-4 border border-blue-200 hover:bg-blue-50 rounded-lg font-semibold text-gray-900 transition-colors">
                    Make Offer
                  </button>
                  <button className="py-3 px-4 border border-blue-200 hover:bg-blue-50 rounded-lg font-semibold text-gray-900 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-blue-200">
              <div className="flex border-b border-blue-200">
                {[
                  { id: 'details', label: 'Details', icon: Grid3X3 },
                  { id: 'history', label: 'History', icon: Activity },
                  { id: 'offers', label: 'Offers', icon: Coins }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Token ID</p>
                        <p className="font-semibold text-gray-900">#{nft.tokenId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contract</p>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">{formatAddress(nft.owner)}</p>
                          <button 
                            onClick={() => copyToClipboard(nft.owner)}
                            className="p-1 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Copy size={14} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Token Standard</p>
                        <p className="font-semibold text-gray-900">ERC-721</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Chain</p>
                        <p className="font-semibold text-gray-900">World Chain</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Description</p>
                      <p className="text-gray-900">
                        A unique digital artwork from the GHOSTART collection, featuring innovative design and artistic expression. 
                        This NFT represents ownership of a one-of-a-kind piece of digital art on the World Chain.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="text-green-600" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Listed for Sale</p>
                          <p className="text-sm text-gray-600">2 days ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{nft.priceWLD} WLD</p>
                        <p className="text-sm text-gray-600">Current Price</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="text-blue-600" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Minted</p>
                          <p className="text-sm text-gray-600">1 week ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">Free</p>
                        <p className="text-sm text-gray-600">Mint Price</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'offers' && (
                  <div className="text-center py-8">
                    <Coins className="text-gray-400 mx-auto mb-4" size={48} />
                    <p className="text-gray-600">No offers yet</p>
                    <p className="text-sm text-gray-500">Be the first to make an offer</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related NFTs */}
        {relatedNFTs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More from this Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedNFTs.map((relatedNFT) => (
                <Link 
                  key={relatedNFT.id}
                  href={`/nft/${relatedNFT.id}`}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all border border-blue-200 group"
                >
                  <div className="aspect-square relative">
                    <Image 
                      src={relatedNFT.image} 
                      alt={relatedNFT.name} 
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{relatedNFT.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">#{relatedNFT.tokenId}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">Price</span>
                        <p className="font-bold text-blue-600">{relatedNFT.priceWLD} WLD</p>
                      </div>
                      <button className="p-2 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
                        <ExternalLink size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
