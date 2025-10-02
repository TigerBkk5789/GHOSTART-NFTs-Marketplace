"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function TradingBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleTrade = () => {
    window.open(
      "https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990",
      "_blank",
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/ghostart-cryptocurrency-coin-logo.jpg"
                alt="GHOSTART"
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Trade $GHOSTART Now</p>
              <p className="text-xs opacity-90 truncate">Early Access • 100x-1000x Potential</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleTrade}
              size="sm"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-xs px-3 py-1 h-auto"
            >
              Trade Now
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
