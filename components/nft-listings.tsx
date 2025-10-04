"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, Grid, List, Eye, Heart, Clock, User, ExternalLink } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface NFTListingsProps {
  locale: Locale
}

// Mock data for NFT listings - iOS compliant (view-only)
const nftListings = [
  {
    id: 1,
    name: "Ghost Art #001",
    creator: "ArtistOne",
    image: "/nft-placeholder-1.jpg",
    views: 1250,
    likes: 89,
    timeAgo: "2h",
    rarity: "Legendary",
    collection: "Ghost Art Collection",
    description: "A unique digital artwork representing the spirit of creativity"
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
    collection: "Digital Spirits",
    description: "An ethereal digital spirit captured in blockchain"
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
    collection: "World Chain Collection",
    description: "Artwork celebrating the World Chain ecosystem"
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
    collection: "Mystic Ghosts",
    description: "A mysterious ghost from the digital realm"
  },
  {
    id: 5,
    name: "Cosmic Art #203",
    creator: "CosmicArtist",
    image: "/nft-placeholder-5.jpg",
    views: 1500,
    likes: 98,
    timeAgo: "3h",
    rarity: "Epic",
    collection: "Cosmic Collection",
    description: "Exploring the cosmos through digital art"
  },
  {
    id: 6,
    name: "Ethereal Spirit #067",
    creator: "EtherealCreator",
    image: "/nft-placeholder-6.jpg",
    views: 890,
    likes: 73,
    timeAgo: "5h",
    rarity: "Rare",
    collection: "Ethereal Spirits",
    description: "A delicate spirit floating in digital space"
  }
]

export function NFTListings({ locale }: NFTListingsProps) {
  const t = getTranslations(locale)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRarity, setSelectedRarity] = useState<string>("all")

  const filteredNFTs = nftListings.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.collection.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === "all" || nft.rarity.toLowerCase() === selectedRarity.toLowerCase()
    return matchesSearch && matchesRarity
  })

  const rarityOptions = ["all", "legendary", "epic", "rare", "common"]

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold">NFT Listings</h2>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {filteredNFTs.length} NFTs
        </Badge>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search NFTs, creators, or collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
          >
            {rarityOptions.map(rarity => (
              <option key={rarity} value={rarity}>
                {rarity === "all" ? "All Rarities" : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              </option>
            ))}
          </select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* NFT Grid/List */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        : "space-y-4"
      }>
        {filteredNFTs.map((nft) => (
          <Card key={nft.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <div className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${
                  viewMode === "grid" ? "aspect-square" : "h-32"
                }`}>
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
                {viewMode === "list" && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{nft.description}</p>
                )}
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
                  <Eye className="h-4 w-4 mr-2" />
                  View Details (iOS Compliant)
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No NFTs Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Browse NFT collections on World Chain • View-only experience on iOS
        </p>
      </div>
    </div>
  )
}
