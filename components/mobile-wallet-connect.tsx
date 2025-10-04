"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CheckCircle2, Loader2, ExternalLink, Copy, LogOut } from "lucide-react"
import { MiniKit, type WalletAuthInput } from "@worldcoin/minikit-js"
import { MINIKIT_ERROR_CODES, MiniKitErrorHandler } from "@/lib/minikit-api"

interface MobileWalletConnectProps {
  className?: string
}

export function MobileWalletConnect({ className = "" }: MobileWalletConnectProps) {
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
            // Mock wallet connection for now - in real implementation, use MiniKit.getWalletAddress()
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
        statement: "Connect your World App wallet to GHOSTART NFT Marketplace for identity verification and token access",
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

  const handleDisconnect = () => {
    setWalletAddress(null)
    setIsConnected(false)
  }

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      // You could add a toast notification here
    }
  }

  if (!isInstalled) {
    return (
      <div className={`${className}`}>
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open in World App</span>
        </Button>
      </div>
    )
  }

  if (isConnected && walletAddress) {
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="h-6 w-6 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            >
              <LogOut className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <Button
        variant="default"
        size="sm"
        onClick={handleConnectWallet}
        disabled={isLoading}
        className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </>
        )}
      </Button>
      
      {error && (
        <Alert className="mt-2 bg-red-100 border-red-400 text-red-800">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}


