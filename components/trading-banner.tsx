"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, TrendingUp, ExternalLink, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export function TradingBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-none border-x-0 border-t-0 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
              <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                2000 WLD Target
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <AlertDescription className="text-orange-900 dark:text-orange-100 font-medium">
              <span className="hidden sm:inline">Trade GHOSTART on PUF to reach 2000 WLD and launch on all trading platforms!</span>
              <span className="sm:hidden">Trade GHOSTART on PUF - 2000 WLD target!</span>
              <span className="block sm:inline sm:ml-2 text-sm font-bold text-orange-700 dark:text-orange-300">
                Potential 100x-1000x returns from current price!
              </span>
            </AlertDescription>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            asChild 
            size="sm" 
            className="bg-orange-600 hover:bg-orange-700 text-white border-0"
          >
            <a
              href="https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              Trade Now
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 dark:text-orange-400 dark:hover:text-orange-300 dark:hover:bg-orange-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-200 dark:bg-orange-800">
        <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse"></div>
      </div>
    </Alert>
  )
}