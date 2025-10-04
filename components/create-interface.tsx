"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Plus, Loader2, CheckCircle2, XCircle, Wallet, Shield, User, Image as ImageIcon } from "lucide-react"
import { MiniKit } from "@worldcoin/minikit-js"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { MINIKIT_ERROR_CODES, MiniKitErrorHandler } from "@/lib/minikit-api"

interface CreateInterfaceProps {
  locale: Locale
}

export function CreateInterface({ locale }: CreateInterfaceProps) {
  const t = getTranslations(locale)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Collection form data
  const [collectionName, setCollectionName] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")
  const [creatorName, setCreatorName] = useState("")
  const [collectionSymbol, setCollectionSymbol] = useState("")
  const [maxSupply, setMaxSupply] = useState("1000")
  const [isProcessing, setIsProcessing] = useState(false)
  const [creationSuccess, setCreationSuccess] = useState(false)
  const [createdCollection, setCreatedCollection] = useState<any>(null)

  useEffect(() => {
    const checkMiniKit = async () => {
      try {
        const installed = await MiniKit.isInstalled()
        setIsInstalled(installed)
        
        if (installed) {
          try {
            // const address = await MiniKit.getWalletAddress()
            const address = "0x1234567890123456789012345678901234567890" // Mock address for now
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

  const handleCreateCollection = async () => {
    if (!collectionName.trim() || !creatorName.trim() || !collectionSymbol.trim()) {
      setError("Please fill in all required fields")
      return
    }

    if (!isInstalled) {
      setError("MiniKit not available. Please open this in World App.")
      return
    }

    if (!isConnected) {
      setError("Please connect your wallet first")
      return
    }

    setIsProcessing(true)
    setError(null)
    
    try {
      // Simulate collection creation (in real implementation, this would deploy a smart contract)
      const collectionData = {
        name: collectionName,
        symbol: collectionSymbol,
        description: collectionDescription,
        creator: creatorName,
        creatorWallet: walletAddress,
        maxSupply: parseInt(maxSupply),
        contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        createdAt: new Date().toISOString(),
        isActive: true
      }

      // Simulate API call to create collection
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setCreatedCollection(collectionData)
      setCreationSuccess(true)
      
      console.log('Collection created:', collectionData)
      
    } catch (error) {
      console.error('Error creating collection:', error)
      setError('Failed to create collection. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (creationSuccess && createdCollection) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Collection Created! 🎉</CardTitle>
          <CardDescription>
            Your NFT collection has been deployed on World Chain
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-semibold">Collection Details:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Name: {createdCollection.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Symbol: {createdCollection.symbol}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Creator: {createdCollection.creator}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Max Supply: {createdCollection.maxSupply}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Contract: {createdCollection.contractAddress.slice(0, 10)}...</p>
          </div>
          <Button 
            onClick={() => {
              setCreationSuccess(false)
              setCollectionName("")
              setCollectionDescription("")
              setCreatorName("")
              setCollectionSymbol("")
              setMaxSupply("1000")
              setCreatedCollection(null)
            }}
            variant="outline"
            className="w-full"
          >
            Create Another Collection
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Plus className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle>Create NFT Collection</CardTitle>
        <CardDescription>
          Deploy your own ERC-721 collection on World Chain
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Collection Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="collectionName">Collection Name *</Label>
            <Input
              id="collectionName"
              placeholder="Enter collection name..."
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="collectionSymbol">Collection Symbol *</Label>
            <Input
              id="collectionSymbol"
              placeholder="e.g., GAC (max 10 chars)"
              value={collectionSymbol}
              onChange={(e) => setCollectionSymbol(e.target.value.toUpperCase())}
              maxLength={10}
            />
          </div>

          <div>
            <Label htmlFor="collectionDescription">Description</Label>
            <Input
              id="collectionDescription"
              placeholder="Describe your collection..."
              value={collectionDescription}
              onChange={(e) => setCollectionDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="creatorName">Creator Name *</Label>
            <Input
              id="creatorName"
              placeholder="Your creator name..."
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="maxSupply">Max Supply</Label>
            <Input
              id="maxSupply"
              type="number"
              placeholder="1000"
              value={maxSupply}
              onChange={(e) => setMaxSupply(e.target.value)}
              min="1"
              max="10000"
            />
          </div>
        </div>

        {/* Requirements Alert */}
        <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Requirements:</strong>
            <br />
            • World App wallet connection required
            <br />
            • World ID verification for creator registration
            <br />
            • ERC-721 standard compliance
          </AlertDescription>
        </Alert>

        {/* Wallet Connection Status */}
        {!isConnected && isInstalled && (
          <Alert>
            <Wallet className="h-4 w-4" />
            <AlertDescription>
              Please connect your World App wallet to create collections.
            </AlertDescription>
          </Alert>
        )}

        {!isInstalled && (
          <Alert>
            <AlertDescription>
              MiniKit not detected. Please open this app in World App to create collections.
            </AlertDescription>
          </Alert>
        )}

        {/* Create Button */}
        <Button
          onClick={handleCreateCollection}
          disabled={!collectionName.trim() || !creatorName.trim() || !collectionSymbol.trim() || !isConnected || isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Collection...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Collection</span>
            </div>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <Alert className="bg-red-100 border-red-400 text-red-800">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Collection Preview */}
        {collectionName && collectionSymbol && creatorName && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Collection Preview:</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {collectionName}</p>
              <p><strong>Symbol:</strong> {collectionSymbol}</p>
              <p><strong>Creator:</strong> {creatorName}</p>
              <p><strong>Max Supply:</strong> {maxSupply}</p>
              <p><strong>Standard:</strong> ERC-721</p>
            </div>
          </div>
        )}

        {/* Contract Info */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t">
          <p>Smart Contract: ERC-721 Standard</p>
          <p className="font-mono text-xs mt-1">
            World Chain Optimized
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
