"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, Heart, Clock, User, Image as ImageIcon, ExternalLink, Wallet } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { MiniKit } from "@worldcoin/minikit-js"

interface MyNFTsProps {
  locale: Locale
}

// Mock data for user's NFTs
const mockUserNFTs = [
  {
    id: 1,
    name: "My Ghost Art #001",
    collection: "My Collection",
    image: "/nft-placeholder-1.jpg",
    description: "My first NFT creation",
    createdAt: "2024-01-15",
    contractAddress: "0x1234...5678",
    tokenId: "1",
    isOwned: true,
    isCreated: true
  },
  {
    id: 2,
    name: "Digital Spirit #042",
    collection: "Digital Spirits",
    image: "/nft-placeholder-2.jpg",
    description: "A beautiful digital spirit",
    createdAt: "2024-01-14",
    contractAddress: "0x9876...5432",
    tokenId: "42",
    isOwned: true,
    isCreated: false
  },
  {
    id: 3,
    name: "World Chain Art #156",
    collection: "World Chain Collection",
    image: "/nft-placeholder-3.jpg",
    description: "Artwork celebrating World Chain",
    createdAt: "2024-01-13",
    contractAddress: "0xabcd...efgh",
    tokenId: "156",
    isOwned: true,
    isCreated: false
  }
]

const mockUserCollections = [
  {
    id: 1,
    name: "My Collection",
    symbol: "MC",
    description: "My personal NFT collection",
    totalSupply: 100,
    minted: 1,
    contractAddress: "0x1234...5678",
    createdAt: "2024-01-15",
    isActive: true
  }
]

export function MyNFTs({ locale }: MyNFTsProps) {
  const t = getTranslations(locale)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"owned" | "created" | "collections">("owned")

  useEffect(() => {
    const checkMiniKit = async () => {
      try {
        const installed = await MiniKit.isInstalled()
        setIsInstalled(installed)
        
        if (installed) {
          try {
            // Mock wallet connection for now
            const address = "0x1234567890123456789012345678901234567890"
            if (address) {
              setWalletAddress(address)
              setIsConnected(true)
            }
          } catch (error) {
            // Wallet not connected yet
          }
        }
      } catch (error) {
        console.error('Error checking MiniKit:', error)
      }
    }

    checkMiniKit()
  }, [])

  const ownedNFTs = mockUserNFTs.filter(nft => nft.isOwned)
  const createdNFTs = mockUserNFTs.filter(nft => nft.isCreated)

  if (!isInstalled) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            My NFTs
          </CardTitle>
          <CardDescription>
            View and manage your NFT collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please open this app in World App to view your NFTs.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            My NFTs
          </CardTitle>
          <CardDescription>
            View and manage your NFT collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Wallet className="h-4 w-4" />
            <AlertDescription>
              Please connect your World App wallet to view your NFTs.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          My NFTs
        </CardTitle>
        <CardDescription>
          View and manage your NFT collections • Wallet: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <Button
            variant={activeTab === "owned" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("owned")}
            className="flex-1"
          >
            Owned ({ownedNFTs.length})
          </Button>
          <Button
            variant={activeTab === "created" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("created")}
            className="flex-1"
          >
            Created ({createdNFTs.length})
          </Button>
          <Button
            variant={activeTab === "collections" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("collections")}
            className="flex-1"
          >
            Collections ({mockUserCollections.length})
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "owned" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Owned NFTs</h3>
            {ownedNFTs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ownedNFTs.map((nft) => (
                  <Card key={nft.id} className="group hover:shadow-lg transition-all duration-300">
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
                          <Badge variant="secondary" className="text-xs">
                            Owned
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                            #{nft.tokenId}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg truncate">{nft.name}</h4>
                        <p className="text-sm text-muted-foreground truncate">{nft.collection}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span className="truncate">You</span>
                      </div>

                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{nft.createdAt}</span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>Contract: {nft.contractAddress}</p>
                      </div>

                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details (iOS Compliant)
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No NFTs Owned</h3>
                <p className="text-muted-foreground">
                  You don't own any NFTs yet. Start by minting or purchasing some!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "created" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Created NFTs</h3>
            {createdNFTs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {createdNFTs.map((nft) => (
                  <Card key={nft.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">GA</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">NFT Preview</p>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            Created
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                            #{nft.tokenId}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h4 className="font-semibold text-lg truncate">{nft.name}</h4>
                        <p className="text-sm text-muted-foreground truncate">{nft.collection}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span className="truncate">You (Creator)</span>
                      </div>

                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{nft.createdAt}</span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>Contract: {nft.contractAddress}</p>
                      </div>

                      <Button variant="outline" size="sm" className="w-full" disabled>
                        <Eye className="h-4 w-4 mr-2" />
                        Manage NFT (iOS Compliant)
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No NFTs Created</h3>
                <p className="text-muted-foreground">
                  You haven't created any NFTs yet. Start by creating a collection!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "collections" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">My Collections</h3>
            {mockUserCollections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockUserCollections.map((collection) => (
                  <Card key={collection.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{collection.name}</CardTitle>
                          <CardDescription>{collection.symbol}</CardDescription>
                        </div>
                        <Badge variant={collection.isActive ? "default" : "secondary"}>
                          {collection.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{collection.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold">Total Supply</p>
                          <p className="text-muted-foreground">{collection.totalSupply}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Minted</p>
                          <p className="text-muted-foreground">{collection.minted}</p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <p>Contract: {collection.contractAddress}</p>
                        <p>Created: {collection.createdAt}</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1" disabled>
                          <Eye className="h-4 w-4 mr-2" />
                          View Collection
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" disabled>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Collections</h3>
                <p className="text-muted-foreground">
                  You haven't created any collections yet. Create your first collection above!
                </p>
              </div>
            )}
          </div>
        )}

        {/* iOS Compliance Notice */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>iOS Compliance:</strong> NFT viewing and management features are view-only on iOS devices. 
            External purchase links and management actions are disabled to comply with App Store guidelines.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
