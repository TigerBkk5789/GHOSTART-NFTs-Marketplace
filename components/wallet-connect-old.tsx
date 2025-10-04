"use client"

import { useEffect, useState } from "react"
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

function isMiniKitAvailable(): boolean {
  try {
    return MiniKit.isInstalled()
  } catch {
    return false
  }
}

export function WalletConnect({ locale, onWalletConnected }: WalletConnectProps) {
  const t = getTranslations(locale)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMiniKit, setIsMiniKit] = useState(false)

  useEffect(() => {
    setIsMiniKit(isMiniKitAvailable())
  }, [])

  const connectWalletMiniKit = async () => {
    if (!isMiniKitAvailable()) {
      setError(t.wallet.worldAppRequired)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const walletAuthInput: WalletAuthInput = {
        nonce: crypto.randomUUID(),
        expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(),
        statement: "Connect your World App wallet to GHOSTART (1 GHOSTART = $0.000009 USDT) for identity verification and token access",
      }

      const { finalPayload } = await MiniKit.walletAuth(walletAuthInput)

      if (finalPayload.status === "error") {
        setError("Wallet connection was cancelled or failed")
        setLoading(false)
        return
      }

      const address = finalPayload.address
      setWalletAddress(address)
      onWalletConnected?.(address)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setLoading(false)
    }
  }

  const connectWalletWeb = async () => {
    setError("Web wallet connection coming soon. Please use World App for now.")
  }

  const handleConnect = () => {
    if (isMiniKit) {
      connectWalletMiniKit()
    } else {
      connectWalletWeb()
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setError(null)
    onWalletConnected?.(null as any)
  }

  if (walletAddress) {
    return (
      <Card className="border-green-500 bg-green-50 dark:bg-green-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-green-900 dark:text-green-100">{t.wallet.connected}</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={disconnectWallet}>
              {t.wallet.disconnect}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">{t.wallet.address}:</p>
              <p className="text-xs font-mono text-green-800 dark:text-green-200 break-all bg-green-100 dark:bg-green-900 p-2 rounded">
                {walletAddress}
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
              <a
                href="https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Trade $GHOSTART on PUF
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          {t.wallet.title}
        </CardTitle>
        <CardDescription>{t.wallet.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button onClick={handleConnect} disabled={loading} className="w-full" size="lg">
          {loading ? (
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

        {isMiniKit && <p className="text-xs text-muted-foreground text-center">{t.wallet.worldAppRequired}</p>}
      </CardContent>
    </Card>
  )
}
