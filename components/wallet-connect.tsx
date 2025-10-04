"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CheckCircle2, Loader2, ExternalLink } from "lucide-react"
import { MiniKit, type WalletAuthInput } from "@worldcoin/minikit-js"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { MINIKIT_ERROR_CODES, MiniKitErrorHandler } from "@/lib/minikit-api"

interface WalletConnectProps {
  locale: Locale
  onWalletConnected?: (address: string) => void
}

export function WalletConnect({ locale, onWalletConnected }: WalletConnectProps) {
  const t = getTranslations(locale)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkMiniKit = async () => {
      try {
        const installed = await MiniKit.isInstalled()
        setIsInstalled(installed)
        
        if (installed) {
          // Try to get existing wallet connection
          try {
            const address = await MiniKit.getWalletAddress()
            if (address) {
              setWalletAddress(address)
              setIsConnected(true)
              onWalletConnected?.(address)
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
  }, [onWalletConnected])

  const handleConnectWallet = async () => {
    if (!isInstalled) {
      setError("MiniKit not available. Please open this in World App.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Get nonce from backend
      const res = await fetch('/api/nonce')
      const { nonce } = await res.json()

      const walletAuthInput: WalletAuthInput = {
        nonce: nonce,
        requestId: '0',
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: "Connect your World App wallet to GHOSTART (1 GHOSTART = $0.000009 USDT) for identity verification and token access",
      }

          const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth(walletAuthInput)

          if (finalPayload.status === 'error') {
            // Handle specific MiniKit error codes
            const errorCode = finalPayload.error_code || 'generic_error'
            const errorMessage = MiniKitErrorHandler.getErrorMessage(errorCode, 'walletAuth')
            setError(errorMessage)
            setIsLoading(false)
            return
          }

      // Verify the authentication with backend
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
        onWalletConnected?.(address)
      } else {
        setError("Authentication verification failed")
      }
    } catch (err) {
      console.error("Wallet connection error:", err)
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isInstalled) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <ExternalLink className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-lg">{t.wallet.title}</CardTitle>
          <CardDescription>
            {t.wallet.worldAppRequired}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please open this app in World App to connect your wallet.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (isConnected && walletAddress) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-lg">{t.wallet.connected}</CardTitle>
          <CardDescription>
            {t.wallet.address}: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Wallet className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle className="text-lg">{t.wallet.title}</CardTitle>
        <CardDescription>
          {t.wallet.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert className="bg-red-100 border-red-400 text-red-800">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={handleConnectWallet}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              {t.wallet.connectButton}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
