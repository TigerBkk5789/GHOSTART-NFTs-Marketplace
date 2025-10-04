"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Copy, ExternalLink, TrendingUp, Users, Zap } from "lucide-react"
import { getTranslations, type Locale } from "@/lib/translations"
import { formatLargeNumber, getCurrentPriceDisplay } from "@/lib/formatting"
import Image from "next/image"

interface TokenDisplayProps {
  locale: Locale
}

export function TokenDisplay({ locale }: TokenDisplayProps) {
  const [isHovered, setIsHovered] = useState(false)
  const t = getTranslations(locale)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Token Display */}
      <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-gray-800 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Token Image */}
            <div className="relative">
              <div 
                className="relative w-48 h-48 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Outer Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-75 blur-xl animate-pulse"></div>
                
                {/* Main Token Circle */}
                <div className="relative w-full h-full bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700 overflow-hidden">
                  {/* New Token Image */}
                  <Image
                    src="/ghostart-token-new.png"
                    alt="GHOSTART Token"
                    width={180}
                    height={180}
                    className="w-full h-full object-cover rounded-full"
                  />
                  
                  {/* Floating Particles */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-3 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-3 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                </div>
                
                {/* Hover Effect */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                )}
              </div>
              
              {/* Token Badge */}
              <div className="absolute -top-2 -right-2">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  <Zap className="w-3 h-3 mr-1" />
                  LIVE
                </Badge>
              </div>
            </div>

            {/* Token Information */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">$GHOSTART</h1>
                <p className="text-gray-300 text-lg">Ghost Art Token</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Active Trading
                  </Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    <Users className="w-3 h-3 mr-1" />
                    Community Driven
                  </Badge>
                </div>
              </div>

              {/* Price Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Current Price</p>
                  <p className="text-white text-xl font-bold">{getCurrentPriceDisplay()}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Market Cap</p>
                  <p className="text-white text-xl font-bold">$2.5M</p>
                </div>
              </div>

              {/* Contract Address */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Contract Address</p>
                <div className="flex items-center space-x-2">
                  <code className="text-white text-sm font-mono bg-gray-900 px-2 py-1 rounded">
                    0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard('0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990')}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold flex-1"
                  onClick={() => window.open('https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Trade on PUF
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-white hover:bg-gray-800 flex-1"
                  onClick={() => window.open('https://sepolia.worldscan.org/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990', '_blank')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View on Explorer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{formatLargeNumber(1000000000)}</div>
            <div className="text-sm text-gray-400">Total Supply</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{formatLargeNumber(10000)}</div>
            <div className="text-sm text-gray-400">Free NFTs</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">2000 WLD</div>
            <div className="text-sm text-gray-400">Launch Target</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

