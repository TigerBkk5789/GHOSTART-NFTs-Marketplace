"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ExternalLink, Zap, Globe, Smartphone, Monitor } from "lucide-react"
import { getTranslations, type Locale } from "@/lib/translations"

interface WorldChainBannerProps {
  locale: Locale
}

export function WorldChainBanner({ locale }: WorldChainBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const t = getTranslations(locale)

  if (!isVisible) return null

  return (
    <div className="relative w-full bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Partnership Logos */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* World Chain Logo */}
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
              </div>
              
              {/* X Symbol */}
              <div className="text-white text-xl font-bold">×</div>
              
              {/* GHOSTART Logo */}
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-blue-400 rounded-full opacity-80"></div>
                <div className="relative z-10 text-white font-bold text-xs text-center">
                  <div className="leading-tight">GHOST</div>
                  <div className="leading-tight">ART</div>
                </div>
              </div>
            </div>
            
            <div className="text-white">
              <h2 className="text-xl font-bold">World Chain</h2>
              <p className="text-sm text-gray-300">Supported on Web, iOS, and Android</p>
            </div>
          </div>

          {/* Features */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Web</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm">iOS</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Monitor className="w-4 h-4" />
              <span className="text-sm">Android</span>
            </div>
          </div>

          {/* Trading Message */}
          <div className="hidden lg:block text-center text-white">
            <p className="text-sm font-semibold">Trade GHOSTART TOKEN on PUF to reach 2000WLD</p>
            <p className="text-xs text-gray-300">to launch on All Trading platform with 100x - 1000x from now price</p>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-3">
            <Button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-lg flex items-center space-x-2"
              onClick={() => window.open('https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990', '_blank')}
            >
              <Zap className="w-4 h-4" />
              <span>Trade Now</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mt-4 space-y-3">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Globe className="w-4 h-4" />
              <span className="text-sm">Web</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm">iOS</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Monitor className="w-4 h-4" />
              <span className="text-sm">Android</span>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm font-semibold text-white">Trade GHOSTART TOKEN on PUF to reach 2000WLD</p>
            <p className="text-xs text-gray-300">to launch on All Trading platform with 100x - 1000x from now price</p>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-lg flex items-center space-x-2 mx-auto"
              onClick={() => window.open('https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990', '_blank')}
            >
              <Zap className="w-4 h-4" />
              <span>Trade Now</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
