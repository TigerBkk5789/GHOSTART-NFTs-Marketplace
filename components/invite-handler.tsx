"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Gift, CheckCircle2, Loader2, XCircle, Wallet, Shield, Users, Coins } from "lucide-react"
import { MiniKit, type WalletAuthInput } from "@worldcoin/minikit-js"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { MINIKIT_ERROR_CODES, MiniKitErrorHandler } from "@/lib/minikit-api"

interface InviteHandlerProps {
  referralCode: string
  locale: Locale
}

export function InviteHandler({ referralCode, locale }: InviteHandlerProps) {
  const t = getTranslations(locale)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [referralProcessed, setReferralProcessed] = useState(false)
  const [referralData, setReferralData] = useState<any>(null)

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

  const handleConnectAndClaim = async () => {
    if (!isInstalled) {
      setError("MiniKit not available. Please open this in World App.")
      return
    }

    if (!referralCode) {
      setError("Invalid referral code")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // First, connect wallet if not connected
      if (!isConnected) {
        const res = await fetch('/api/nonce')
        const { nonce } = await res.json()

        const walletAuthInput: WalletAuthInput = {
          nonce: nonce,
          requestId: '0',
          expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
          notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          statement: "Connect your World App wallet to claim your GHOSTART referral rewards",
        }

        const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthInput)

        if (finalPayload.status === 'error') {
          const errorCode = finalPayload.error_code || 'generic_error'
          const errorMessage = MiniKitErrorHandler.getErrorMessage(errorCode, 'walletAuth')
          setError(errorMessage)
          setIsProcessing(false)
          return
        }

        // Verify authentication
        const response = await fetch('/api/complete-siwe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payload: finalPayload,
            nonce,
          }),
        })

        const result = await response.json()
        
        if (result.status === 'success' && result.isValid) {
          const address = finalPayload.address
          setWalletAddress(address)
          setIsConnected(true)
        } else {
          setError("Wallet authentication failed")
          setIsProcessing(false)
          return
        }
      }

      // Process referral
      const referralResponse = await fetch('/api/process-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralCode: referralCode,
          newUserWallet: walletAddress,
        }),
      })

      const referralResult = await referralResponse.json()
      
      if (referralResult.success) {
        setReferralProcessed(true)
        setReferralData(referralResult.data)
        
        // Track successful referral
        console.log('Referral processed successfully:', referralResult.data)
      } else {
        setError(referralResult.reason || "Failed to process referral")
      }
    } catch (err) {
      console.error("Referral processing error:", err)
      setError("Failed to process referral. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (referralProcessed && referralData) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Welcome to GHOSTART! 🎉</CardTitle>
          <CardDescription>
            Your referral rewards have been claimed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-semibold">Your Rewards:</p>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Welcome Bonus:</span>
                <Badge variant="secondary">50 GHOSTART</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Free NFT Mint:</span>
                <Badge variant="secondary">1 Available</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Referrer Bonus:</span>
                <Badge variant="secondary">100 GHOSTART</Badge>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Referral Code: {referralCode}</p>
            <p>Processed: {new Date().toLocaleString()}</p>
          </div>

          <Button 
            onClick={() => window.location.href = '/explore'}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            Start Exploring GHOSTART
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
        <CardTitle>Claim Your Referral Rewards</CardTitle>
        <CardDescription>
          Connect your World App wallet to claim your welcome bonus
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Referral Code Display */}
        {referralCode && (
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-semibold">Referral Code</span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 font-mono">
              {referralCode}
            </p>
          </div>
        )}

        {/* Rewards Preview */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Your Rewards:</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950 rounded">
              <Coins className="h-4 w-4 text-green-500" />
              <span className="text-sm">50 GHOSTART tokens</span>
              <Badge variant="secondary" className="ml-auto">Welcome Bonus</Badge>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-950 rounded">
              <Gift className="h-4 w-4 text-blue-500" />
              <span className="text-sm">1 Free NFT mint</span>
              <Badge variant="secondary" className="ml-auto">Exclusive</Badge>
            </div>
            <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-950 rounded">
              <Shield className="h-4 w-4 text-purple-500" />
              <span className="text-sm">World ID verification</span>
              <Badge variant="secondary" className="ml-auto">Required</Badge>
            </div>
          </div>
        </div>

        {/* Wallet Connection Status */}
        {!isConnected && isInstalled && (
          <Alert>
            <Wallet className="h-4 w-4" />
            <AlertDescription>
              Please connect your World App wallet to claim your rewards.
            </AlertDescription>
          </Alert>
        )}

        {!isInstalled && (
          <Alert>
            <AlertDescription>
              MiniKit not detected. Please open this app in World App to claim rewards.
            </AlertDescription>
          </Alert>
        )}

        {/* Claim Button */}
        <Button
          onClick={handleConnectAndClaim}
          disabled={!referralCode || isProcessing}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Claim Rewards</span>
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

        {/* Terms */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t">
          <p>By claiming rewards, you agree to our terms of service</p>
          <p>World ID verification required for all rewards</p>
        </div>
      </CardContent>
    </Card>
  )
}


