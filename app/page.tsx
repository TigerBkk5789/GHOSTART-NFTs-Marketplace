'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, TrendingUp, Zap, Shield, Globe, ExternalLink, X, Menu, ChevronRight, Star, ArrowRight, Sparkles, Flame, Coins, Users, BarChart3 } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [language, setLanguage] = useState('en');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wldBalance, setWldBalance] = useState(0);
  const [ghostartBalance, setGhostartBalance] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  const translations: any = {
    en: {
      title: 'GHOSTART NFT Marketplace',
      subtitle: 'Trade, Mint & Collect NFTs on World Chain',
      tradeTitle: 'Trade $GHOSTART TOKEN on PUF to reach 2000WLD',
      launchText: 'to launch on All Trading platforms with 100x - 1000x from current price',
      tradeNow: 'Trade Now',
      earlyTrading: 'Early Trading',
      earlyTradingTitle: 'Early Trading on PUF Mini App - Join Before Launch',
      massiveGrowth: 'Massive Growth Potential',
      earlyInvestors: 'Early investors could see 100x-1000x returns when $GHOSTART launches on major exchanges.',
      autoLaunch: 'Auto-Launch at 2000 WLD',
      autoLaunchDesc: 'Token will automatically launch when marketplace reaches 2000 WLD trading volume.',
      earlyTradingAvail: 'Early Trading Available Now',
      earlyTradingDesc: 'Get in early on PUF before the official launch and maximize your potential returns.',
      connect: 'Connect Wallet',
      marketplace: 'NFT Marketplace',
      features: 'Why Choose GHOSTART?',
      freeMinting: 'Free NFT Minting',
      freeMintingDesc: 'Create NFTs without gas fees on World Chain',
      secureTrading: 'Secure Trading',
      secureTradingDesc: 'All transactions secured by smart contracts',
      globalAccess: 'Global Access',
      globalAccessDesc: 'Trade from anywhere in the world',
      stats: 'Market Statistics',
      marketCap: 'Market Cap',
      toLaunch: 'To Launch',
      potential: 'Potential Returns',
      joinNow: 'Join the Revolution',
      joinDesc: 'Be part of the next generation NFT marketplace on World Chain',
      startTrading: 'Start Trading Now',
      exploreMarketplace: 'Explore Marketplace',
      builtOn: 'Built on World Chain',
      poweredBy: 'Powered by World ID',
    },
    es: {
      title: 'GHOSTART Mercado NFT',
      subtitle: 'Comercia, Crea y Colecciona NFTs en World Chain',
      tradeTitle: 'Comercia TOKEN $GHOSTART en PUF para alcanzar 2000WLD',
      launchText: 'para lanzar en Todas las plataformas de Trading con 100x - 1000x desde el precio actual',
      tradeNow: 'Comerciar Ahora',
      earlyTrading: 'Trading Temprano',
      earlyTradingTitle: 'Trading Temprano en PUF Mini App - Únete Antes del Lanzamiento',
      massiveGrowth: 'Potencial de Crecimiento Masivo',
      earlyInvestors: 'Los inversores tempranos podrían ver retornos de 100x-1000x cuando $GHOSTART se lance en los principales exchanges.',
      autoLaunch: 'Lanzamiento Automático a 2000 WLD',
      autoLaunchDesc: 'El token se lanzará automáticamente cuando el mercado alcance 2000 WLD de volumen de trading.',
      earlyTradingAvail: 'Trading Temprano Disponible Ahora',
      earlyTradingDesc: 'Entra temprano en PUF antes del lanzamiento oficial y maximiza tus retornos potenciales.',
      connect: 'Conectar Billetera',
      marketplace: 'Mercado NFT',
      features: '¿Por qué elegir GHOSTART?',
      freeMinting: 'Creación Gratuita de NFTs',
      freeMintingDesc: 'Crea NFTs sin tarifas de gas en World Chain',
      secureTrading: 'Trading Seguro',
      secureTradingDesc: 'Todas las transacciones aseguradas por contratos inteligentes',
      globalAccess: 'Acceso Global',
      globalAccessDesc: 'Comercia desde cualquier parte del mundo',
      stats: 'Estadísticas del Mercado',
      marketCap: 'Capitalización',
      toLaunch: 'Para Lanzar',
      potential: 'Retornos Potenciales',
      joinNow: 'Únete a la Revolución',
      joinDesc: 'Sé parte de la próxima generación de mercado NFT en World Chain',
      startTrading: 'Comenzar a Comerciar',
      exploreMarketplace: 'Explorar Mercado',
      builtOn: 'Construido en World Chain',
      poweredBy: 'Impulsado por World ID',
    },
  };

  const t = translations[language];

  useEffect(() => {
    if (address) {
      fetchBalances();
    }
  }, [address]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-blue-200/50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                <Image 
                  src="/ghostart-cryptocurrency-coin-logo.jpg"
                  alt="GHOSTART"
                  width={50}
                  height={50}
                  className="relative z-10 rounded-full shadow-2xl"
                />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GHOSTART</span>
                <p className="text-xs text-gray-600">NFT Marketplace</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/80 border border-blue-200 rounded-lg px-3 py-2 text-sm backdrop-blur-sm text-gray-900"
              >
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="th">🇹🇭 ไทย</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="pt">🇧🇷 Português</option>
              </select>

              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-50 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600">Balance</p>
                    <p className="font-bold text-blue-600">{ghostartBalance.toFixed(0)} $GHOST</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-lg font-semibold shadow-lg text-white">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/50 text-white"
                >
                  <Wallet size={20} />
                  <span>{t.connect}</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 z-40 pt-20 md:hidden">
          <div className="container mx-auto px-4 py-8">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-white border border-blue-200 rounded-lg px-4 py-3 mb-4 text-gray-900"
            >
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
            </select>
            <button
              onClick={() => {
                setShowWalletModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4 rounded-lg font-bold text-lg text-white"
            >
              {t.connect}
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="container mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-blue-200">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <Globe className="text-blue-600" size={20} />
            <span className="text-sm font-semibold text-gray-900">{t.builtOn}</span>
          </div>
          
          <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">{t.subtitle}</p>

          {/* Platform Support */}
          <div className="flex justify-center space-x-8 mb-16">
            <div className="flex items-center space-x-2 text-sm bg-blue-50 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200">
              <Globe size={20} className="text-blue-600" />
              <span className="text-gray-900">Web</span>
            </div>
            <div className="flex items-center space-x-2 text-sm bg-blue-50 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200">
              <Shield size={20} className="text-blue-600" />
              <span className="text-gray-900">iOS</span>
            </div>
            <div className="flex items-center space-x-2 text-sm bg-blue-50 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-200">
              <Zap size={20} className="text-blue-600" />
              <span className="text-gray-900">Android</span>
            </div>
          </div>

          {/* GHOSTART Coin with Enhanced Animation */}
          <div className="relative w-80 h-80 mx-auto mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-40 animate-ping"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image
                src="/ghostart-cryptocurrency-coin-logo.jpg"
                alt="GHOSTART Token"
                width={320}
                height={320}
                className="rounded-full shadow-2xl border-4 border-blue-200"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full animate-bounce animation-delay-1000"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-indigo-400 rounded-full animate-bounce animation-delay-2000"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            {t.tradeTitle}
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t.launchText}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-blue-500 to-indigo-500 px-10 py-5 rounded-xl font-bold text-xl hover:from-blue-600 hover:to-indigo-600 transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-blue-500/50 transform hover:scale-105 text-white"
            >
              <Zap size={28} />
              <span>{t.tradeNow}</span>
              <ExternalLink size={24} />
            </a>
            
            <a
              href="/collection"
              className="group bg-blue-50 backdrop-blur-sm border-2 border-blue-200 px-10 py-5 rounded-xl font-bold text-xl hover:bg-blue-100 transition-all flex items-center justify-center space-x-3 transform hover:scale-105 text-gray-900"
            >
              <span>Explore Collection</span>
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Early Trading Badge */}
          <div className="inline-flex items-center space-x-3 bg-blue-100 border border-blue-300 px-8 py-4 rounded-full backdrop-blur-sm">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-blue-700 text-lg">{t.earlyTrading}</span>
            <Sparkles className="text-blue-600 animate-spin" size={20} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-blue-50/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t.features}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border border-blue-200 hover:border-blue-400 transition-all transform hover:scale-105 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Flame className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.freeMinting}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.freeMintingDesc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-200 hover:border-indigo-400 transition-all transform hover:scale-105 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.secureTrading}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.secureTradingDesc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-3xl border border-cyan-200 hover:border-cyan-400 transition-all transform hover:scale-105 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.globalAccess}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.globalAccessDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t.stats}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 backdrop-blur-sm p-8 rounded-3xl border border-blue-200 text-center group hover:border-blue-400 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-white" size={40} />
              </div>
              <h4 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                1,850
              </h4>
              <p className="text-gray-600 text-lg">{t.marketCap}</p>
            </div>
            <div className="bg-indigo-50 backdrop-blur-sm p-8 rounded-3xl border border-indigo-200 text-center group hover:border-indigo-400 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={40} />
              </div>
              <h4 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                92.5%
              </h4>
              <p className="text-gray-600 text-lg">{t.toLaunch}</p>
            </div>
            <div className="bg-cyan-50 backdrop-blur-sm p-8 rounded-3xl border border-cyan-200 text-center group hover:border-cyan-400 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Star className="text-white" size={40} />
              </div>
              <h4 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                100x-1000x
              </h4>
              <p className="text-gray-600 text-lg">{t.potential}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-100 to-indigo-100 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t.joinNow}
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t.joinDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-4 bg-gradient-to-r from-blue-500 to-indigo-500 px-12 py-6 rounded-2xl font-bold text-2xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-2xl shadow-blue-500/50 transform hover:scale-105 text-white"
                >
                  <Zap size={32} />
                  <span>{t.startTrading}</span>
                  <ExternalLink size={28} />
                </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-blue-900/80 border-t border-blue-200 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 rounded-full blur-md opacity-75 animate-pulse"></div>
              <Image 
                src="/ghostart-cryptocurrency-coin-logo.jpg"
                alt="GHOSTART"
                width={60}
                height={60}
                className="relative z-10 rounded-full shadow-2xl"
              />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">GHOSTART</span>
              <p className="text-sm text-blue-200">{t.poweredBy}</p>
            </div>
          </div>
          <p className="text-blue-100 mb-8 text-lg">
            NFT Marketplace on World Chain
          </p>
          <div className="flex justify-center space-x-8 text-sm text-blue-200">
            <a href="/collection" className="hover:text-white transition-colors flex items-center space-x-2">
              <span>Collection</span>
              <ArrowRight size={16} />
            </a>
            <a href="/wallet" className="hover:text-white transition-colors flex items-center space-x-2">
              <span>Wallet</span>
              <ArrowRight size={16} />
            </a>
            <a href="https://worldscan.org/token/0x4df029e25EA0043fCBfb7A7f15f2b25F62C9BDb990" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
              <span>Contract</span>
              <ExternalLink size={16} />
            </a>
                <a href="https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
                  <span>Trade on PUF</span>
                  <ExternalLink size={16} />
                </a>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-200/20">
            <p className="text-blue-200 text-sm">
              © 2024 GHOSTART NFT Marketplace. Built with ❤️ on World Chain.
            </p>
          </div>
        </div>
      </footer>

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

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}