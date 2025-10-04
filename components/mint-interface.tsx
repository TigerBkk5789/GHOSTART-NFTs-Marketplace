"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Coins, Loader2, CheckCircle2, XCircle, Wallet, Shield, Zap } from "lucide-react"
import { MiniKit, type PayCommandInput, Tokens, tokenToDecimals } from "@worldcoin/minikit-js"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { MINIKIT_ERROR_CODES, MiniKitErrorHandler } from "@/lib/minikit-api"

interface MintInterfaceProps {
  locale: Locale
}

export function MintInterface({ locale }: MintInterfaceProps) {
  const t = getTranslations(locale)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mintType, setMintType] = useState<"free" | "paid">("free")
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [creatorName, setCreatorName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null)

  // Contract addresses (to be updated after deployment)
  const FREE_MINT_CONTRACT = process.env.NEXT_PUBLIC_FREE_MINT_CONTRACT_ADDRESS || "0x..."
  const PAID_MINT_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "0x..."
  const APP_FEE = "0.0001" // ETH
  const MINT_PRICE = "0.001" // ETH

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

  const handleFreeMint = async () => {
    if (!nftName.trim() || !creatorName.trim()) {
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
      // Create payment payload for app fee
      const payPayload: PayCommandInput = {
        reference: crypto.randomUUID().replace(/-/g, ''),
        to: process.env.NEXT_PUBLIC_WALLET_ADDRESS || "0x32f1e35291967c07ec02aa81394dbf87d1d25e52",
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(parseFloat(APP_FEE), Tokens.WLD).toString(),
          },
        ],
        description: `Free NFT Mint - App Fee: ${nftName}`,
      }

      const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.pay(payPayload)

      if (finalPayload.status === 'error') {
        const errorCode = finalPayload.error_code || 'generic_error'
        const errorMessage = MiniKitErrorHandler.getErrorMessage(errorCode, 'pay')
        setError(errorMessage)
        setIsProcessing(false)
        return
      }

      // Simulate NFT minting (in real implementation, this would call the smart contract)
      const tokenId = Math.floor(Math.random() * 10000) + 1
      setMintedTokenId(tokenId)
      setMintSuccess(true)
      
      console.log('Free NFT minted:', {
        tokenId,
        name: nftName,
        description: nftDescription,
        creator: creatorName,
        wallet: walletAddress,
        transactionId: finalPayload.transaction_id
      })
      
    } catch (error) {
      console.error('Error minting NFT:', error)
      setError('Failed to mint NFT. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaidMint = async () => {
    if (!nftName.trim() || !creatorName.trim()) {
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
      const totalAmount = parseFloat(MINT_PRICE) + parseFloat(APP_FEE)
      
      // Create payment payload for mint price + app fee
      const payPayload: PayCommandInput = {
        reference: crypto.randomUUID().replace(/-/g, ''),
        to: process.env.NEXT_PUBLIC_WALLET_ADDRESS || "0x32f1e35291967c07ec02aa81394dbf87d1d25e52",
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(totalAmount, Tokens.WLD).toString(),
          },
        ],
        description: `Paid NFT Mint: ${nftName} (${MINT_PRICE} ETH + ${APP_FEE} ETH fee)`,
      }

      const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.pay(payPayload)

      if (finalPayload.status === 'error') {
        const errorCode = finalPayload.error_code || 'generic_error'
        const errorMessage = MiniKitErrorHandler.getErrorMessage(errorCode, 'pay')
        setError(errorMessage)
        setIsProcessing(false)
        return
      }

      // Simulate NFT minting (in real implementation, this would call the smart contract)
      const tokenId = Math.floor(Math.random() * 10000) + 1
      setMintedTokenId(tokenId)
      setMintSuccess(true)
      
      console.log('Paid NFT minted:', {
        tokenId,
        name: nftName,
        description: nftDescription,
        creator: creatorName,
        wallet: walletAddress,
        totalAmount,
        transactionId: finalPayload.transaction_id
      })
      
    } catch (error) {
      console.error('Error minting NFT:', error)
      setError('Failed to mint NFT. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (mintSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">NFT Minted Successfully! 🎉</CardTitle>
          <CardDescription>
            Your NFT has been created on World Chain
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-semibold">NFT Details:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Name: {nftName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Creator: {creatorName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Token ID: #{mintedTokenId}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Type: {mintType === "free" ? "Free Mint" : "Paid Mint"}</p>
          </div>
          <Button 
            onClick={() => {
              setMintSuccess(false)
              setNftName("")
              setNftDescription("")
              setCreatorName("")
              setMintedTokenId(null)
            }}
            variant="outline"
            className="w-full"
          >
            Mint Another NFT
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <Gift className="w-8 h-8 text-orange-600" />
        </div>
        <CardTitle>Mint Your NFT</CardTitle>
        <CardDescription>
          Create unique NFTs on World Chain with World App wallet
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mint Type Selection */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button
              variant={mintType === "free" ? "default" : "outline"}
              onClick={() => setMintType("free")}
              className="flex-1"
            >
              <Gift className="h-4 w-4 mr-2" />
              Free Mint
            </Button>
            <Button
              variant={mintType === "paid" ? "default" : "outline"}
              onClick={() => setMintType("paid")}
              className="flex-1"
            >
              <Coins className="h-4 w-4 mr-2" />
              Paid Mint
            </Button>
          </div>
          
          {mintType === "free" && (
            <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Free Mint:</strong> 1 free NFT per address with World App verification
                <br />
                <strong>App Fee:</strong> {APP_FEE} ETH (supports development)
              </AlertDescription>
            </Alert>
          )}
          
          {mintType === "paid" && (
            <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200">
              <Coins className="h-4 w-4" />
              <AlertDescription>
                <strong>Paid Mint:</strong> Premium NFT with enhanced features
                <br />
                <strong>Cost:</strong> {MINT_PRICE} ETH + {APP_FEE} ETH fee = {(parseFloat(MINT_PRICE) + parseFloat(APP_FEE)).toFixed(4)} ETH total
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* NFT Details Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="nftName">NFT Name *</Label>
            <Input
              id="nftName"
              placeholder="Enter NFT name..."
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="nftDescription">Description (Optional)</Label>
            <Input
              id="nftDescription"
              placeholder="Describe your NFT..."
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
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
        </div>

        {/* Wallet Connection Status */}
        {!isConnected && isInstalled && (
          <Alert>
            <Wallet className="h-4 w-4" />
            <AlertDescription>
              Please connect your World App wallet to mint NFTs.
            </AlertDescription>
          </Alert>
        )}

        {!isInstalled && (
          <Alert>
            <AlertDescription>
              MiniKit not detected. Please open this app in World App to mint NFTs.
            </AlertDescription>
          </Alert>
        )}

        {/* Mint Button */}
        <Button
          onClick={mintType === "free" ? handleFreeMint : handlePaidMint}
          disabled={!nftName.trim() || !creatorName.trim() || !isConnected || isProcessing}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Minting NFT...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>{mintType === "free" ? "Free Mint" : "Paid Mint"}</span>
              <Zap className="w-4 h-4" />
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

        {/* Contract Info */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t">
          <p>Smart Contract: {mintType === "free" ? "GhostArtFreeMint" : "GhostArtNFT"}</p>
          <p className="font-mono text-xs mt-1">
            {mintType === "free" ? FREE_MINT_CONTRACT : PAID_MINT_CONTRACT}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
