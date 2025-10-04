"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, CheckCircle2, Loader2, ExternalLink } from "lucide-react"
import { useMiniKit } from "@/lib/use-minikit"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"

interface WalletConnectProps {
  locale: Locale
  onWalletConnected?: (address: string) => void
}

export function WalletConnect({ locale, onWalletConnected }: WalletConnectProps) {
  const t = getTranslations(locale)
  const {
    isInstalled,
    isConnected,
    walletAddress,
    isLoading,
    error,
    connectWallet
  } = useMiniKit()

  useEffect(() => {
    if (isConnected && walletAddress) {
      onWalletConnected?.(walletAddress)
    }
  }, [isConnected, walletAddress, onWalletConnected])

  const handleConnectWallet = async () => {
    try {
      await connectWallet()
    } catch (err) {
      console.error("Wallet connection error:", err)
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



