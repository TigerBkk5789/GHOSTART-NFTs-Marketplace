import React, { useState, useEffect } from 'react';
import { Wallet, Upload, Search, Filter, X, ExternalLink, AlertCircle, Loader } from 'lucide-react';

const NFTMarketplace = () => {
  const [connected, setConnected] = useState(false);
  const [walletType, setWalletType] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [wldBalance, setWldBalance] = useState(0);
  const [ghostartBalance, setGhostartBalance] = useState(0);
  const [blockNumber, setBlockNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txStatus, setTxStatus] = useState('');
  const [mintingStep, setMintingStep] = useState(0);
  const [language, setLanguage] = useState('en');

  const translations: any = {
    en: { explore: 'Explore', create: 'Create', myNFTs: 'My NFTs', activity: 'Activity', connect: 'Connect Wallet', connecting: 'Connecting...', search: 'Search NFTs...', filters: 'Filters' },
    es: { explore: 'Explorar', create: 'Crear', myNFTs: 'Mis NFTs', activity: 'Actividad', connect: 'Conectar Billetera', connecting: 'Conectando...', search: 'Buscar NFTs...', filters: 'Filtros' },
    th: { explore: 'สำรวจ', create: 'สร้าง', myNFTs: 'NFT ของฉัน', activity: 'กิจกรรม', connect: 'เชื่อมต่อกระเป๋า', connecting: 'กำลังเชื่อมต่อ...', search: 'ค้นหา NFTs...', filters: 'ตัวกรอง' },
    ja: { explore: '探索', create: '作成', myNFTs: 'マイNFT', activity: 'アクティビティ', connect: 'ウォレット接続', connecting: '接続中...', search: 'NFTを検索...', filters: 'フィルター' },
    ko: { explore: '탐색', create: '생성', myNFTs: '내 NFT', activity: '활동', connect: '지갑 연결', connecting: '연결 중...', search: 'NFT 검색...', filters: '필터' },
    pt: { explore: 'Explorar', create: 'Criar', myNFTs: 'Meus NFTs', activity: 'Atividade', connect: 'Conectar Carteira', connecting: 'Conectando...', search: 'Pesquisar NFTs...', filters: 'Filtros' }
  };

  const t = translations[language];

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-full h-32 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 relative">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container mx-auto px-4 h-full flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                <Image 
                  src="https://i.imgur.com/8KXj9vF.png"
                  alt="GHOSTART Logo" 
                  width={80}
                  height={80}
                  className="rounded-full relative z-10 shadow-2xl border-4 border-white/20"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=80&h=80&fit=crop&crop=center';
                  }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">GHOSTART</h1>
                <p className="text-white/90 text-sm">NFT Marketplace on World Chain</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 text-sm backdrop-blur-sm hover:bg-white/30 transition-all"
              >
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="th">🇹🇭 ไทย</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="pt">🇧🇷 Português</option>
              </select>
              
              {blockNumber && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-xs font-semibold">Block #{blockNumber.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              {['explore', 'create', 'myNFTs', 'activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-semibold rounded-lg transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t[tab]}
                </button>
              ))}
            </div>
            
            {!isConnected ? (
              <button 
                onClick={() => setShowWalletModal(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2"
              >
                <Wallet size={20} />
                <span>{t.connect}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-xs text-gray-500">WLD</p>
                  <p className="font-bold text-purple-600">{wldBalance.toFixed(2)}</p>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-xs text-gray-500">$GHOST</p>
                  <p className="font-bold text-blue-600">{Math.floor(ghostartBalance).toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-sm"></div>
                  <Image 
                    src="https://i.imgur.com/8KXj9vF.png"
                    alt="GHOSTART Token" 
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white shadow-lg relative z-10"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=48&h=48&fit=crop&crop=center';
                    }}
                  />
                </div>
                <div>
                  <p className="font-bold text-lg">$GHOSTART Token</p>
                  <p className="text-xs opacity-90">Market Cap: 1,850 WLD • Target: 2,000 WLD</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-xs opacity-90">Launch Progress</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-white/30 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{width: '92.5%'}}></div>
                    </div>
                    <span className="text-sm font-bold">92.5%</span>
                  </div>
                </div>
                
                <a 
                  href="https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center space-x-2"
                >
                  <span>Trade Now</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'explore' && (
          <>
            <div className="mb-8 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="bg-white border px-6 py-3 rounded-lg flex items-center space-x-2">
                <Filter size={20} />
                <span>{t.filters}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nfts.map((nft) => (
                <div key={nft.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
                  <Image 
                    src={nft.image} 
                    alt={nft.name} 
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{nft.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">by {nft.creator}</p>
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 mb-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold">WLD:</span>
                        <span className="font-bold text-purple-600">{nft.priceWLD}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedNFT(nft)}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Mint Your NFT</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-dashed border-green-300 rounded-xl p-8 text-center mb-6">
              <Upload size={48} className="mx-auto mb-4 text-green-500" />
              <p className="text-lg font-semibold text-gray-700">FREE Minting on World Chain!</p>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all">
              Mint NFT (FREE)
            </button>
          </div>
        )}

        {activeTab === 'myNFTs' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your NFT Collection</h3>
            <p className="text-gray-500">{isConnected ? 'No NFTs found' : 'Connect wallet to view'}</p>
          </div>
        )}
      </main>

      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Connect Wallet</h2>
              <button onClick={() => setShowWalletModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    setShowWalletModal(false);
                  }}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
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
