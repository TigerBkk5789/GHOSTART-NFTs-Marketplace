"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Eye, Heart, Clock, User } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import Image from "next/image"

interface TrendingNFTsProps {
  locale: Locale
}

// Mock data for trending NFTs - iOS compliant (view-only)
const trendingNFTs = [
  {
    id: 1,
    name: "Ghost Art #001",
    creator: "ArtistOne",
    image: "/nft-placeholder-1.jpg",
    views: 1250,
    likes: 89,
    timeAgo: "2h",
    rarity: "Legendary",
    collection: "Ghost Art Collection"
  },
  {
    id: 2,
    name: "Digital Spirit #042",
    creator: "CreatorTwo",
    image: "/nft-placeholder-2.jpg",
    views: 980,
    likes: 67,
    timeAgo: "4h",
    rarity: "Epic",
    collection: "Digital Spirits"
  },
  {
    id: 3,
    name: "World Chain Art #156",
    creator: "WorldArtist",
    image: "/nft-placeholder-3.jpg",
    views: 2100,
    likes: 145,
    timeAgo: "1h",
    rarity: "Rare",
    collection: "World Chain Collection"
  },
  {
    id: 4,
    name: "Mystic Ghost #089",
    creator: "MysticCreator",
    image: "/nft-placeholder-4.jpg",
    views: 750,
    likes: 52,
    timeAgo: "6h",
    rarity: "Common",
    collection: "Mystic Ghosts"
  }
]

export function TrendingNFTs({ locale }: TrendingNFTsProps) {
  const t = getTranslations(locale)

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold">Trending NFTs</h2>
        </div>
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Hot 🔥
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingNFTs.map((nft) => (
          <Card key={nft.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">GA</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">NFT Preview</p>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      nft.rarity === 'Legendary' ? 'bg-purple-100 text-purple-800' :
                      nft.rarity === 'Epic' ? 'bg-blue-100 text-blue-800' :
                      nft.rarity === 'Rare' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {nft.rarity}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                    #{nft.id.toString().padStart(3, '0')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg truncate">{nft.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{nft.collection}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="truncate">{nft.creator}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-blue-500" />
                    <span>{nft.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{nft.likes}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{nft.timeAgo}</span>
                </div>
              </div>

              {/* iOS Compliant - View Only, No Purchase Buttons */}
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  disabled
                >
                  View Only (iOS Compliant)
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Browse trending NFTs on World Chain • View-only experience on iOS
        </p>
      </div>
    </div>
  )
}
