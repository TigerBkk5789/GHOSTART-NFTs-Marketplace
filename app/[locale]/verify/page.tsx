"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, Loader2, Shield, Smartphone, TrendingUp } from "lucide-react"
import { MiniKit, type VerifyCommandInput, VerificationLevel, type ISuccessResult } from "@worldcoin/minikit-js"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { useParams } from "next/navigation"
import { Footer } from "@/components/footer"
import { WalletConnect } from "@/components/wallet-connect"

export default function VerifyPage() {
  const params = useParams()
  const locale = params.locale as Locale

  const [action, setAction] = useState("ghostart-verify")
  const [signal, setSignal] = useState("")
  const [loading, setLoading] = useState(false)
  const [isMiniKitInstalled, setIsMiniKitInstalled] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [result, setResult] = useState<{
    success: boolean
    data?: {
      nullifier_hash: string
      merkle_root: string
      verification_level: string
      proof: string
    }
    error?: string
  } | null>(null)

  useEffect(() => {
    const checkMiniKit = async () => {
      try {
        const installed = await MiniKit.isInstalled()
        setIsMiniKitInstalled(installed)
      } catch (error) {
        setIsMiniKitInstalled(false)
      }
    }
    checkMiniKit()
  }, [])

  const handleVerify = async () => {
    if (!walletAddress) {
      setResult({
        success: false,
        error: "Please connect your wallet first",
      })
      return
    }

    if (!action.trim()) {
      setResult({
        success: false,
        error: "Please enter an action ID",
      })
      return
    }

    if (!isMiniKitInstalled) {
      setResult({
        success: false,
        error: "MiniKit is not available. Please open this in World App.",
      })
      return
    }

    setLoading(true)
    setResult(null)

    const verifyPayload: VerifyCommandInput = {
      action: action,
      signal: signal || undefined,
      verification_level: VerificationLevel.Orb,
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)

      if (finalPayload.status === "error") {
        setResult({
          success: false,
          error: "Verification was cancelled or failed",
        })
        setLoading(false)
        return
      }

      const verifyResponse = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult,
          action: action,
          signal: signal || undefined,
        }),
      })

      const verifyResponseJson = await verifyResponse.json()

      if (verifyResponse.ok && verifyResponseJson.verifyRes?.success) {
        setResult({
          success: true,
          data: {
            nullifier_hash: finalPayload.nullifier_hash,
            merkle_root: finalPayload.merkle_root,
            verification_level: finalPayload.verification_level,
            proof: finalPayload.proof,
          },
        })
      } else {
        setResult({
          success: false,
          error: verifyResponseJson.verifyRes?.detail || "Verification failed on backend",
        })
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Verification failed. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="flex-1 p-4 py-8 md:py-12 pb-20 md:pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold text-balance">World ID Verification</h1>
            </div>
            <p className="text-muted-foreground text-pretty">Verify unique humans with World ID incognito actions</p>
          </div>

          <Alert className="border-primary bg-primary/5">
            <TrendingUp className="h-4 w-4" />
            <AlertTitle>Verify to Access $GHOSTART</AlertTitle>
            <AlertDescription>
              Complete World ID verification to prove you're a unique human and gain access to early $GHOSTART trading
              opportunities.
            </AlertDescription>
          </Alert>

          {!isMiniKitInstalled && (
            <Card className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-blue-900 dark:text-blue-100">Mobile App Required</CardTitle>
                </div>
                <CardDescription className="text-blue-800 dark:text-blue-200">
                  This verification feature only works in World App on mobile devices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  To use this app, please open it in World App on your mobile device.
                </p>
              </CardContent>
            </Card>
          )}

          <WalletConnect locale={locale} onWalletConnected={setWalletAddress} />

          <Card>
            <CardHeader>
              <CardTitle>Verification Settings</CardTitle>
              <CardDescription>Configure your incognito action verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="action">Action ID</Label>
                <Input
                  id="action"
                  placeholder="voting-action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">The action ID from your Developer Portal</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signal">Signal (Optional)</Label>
                <Input id="signal" placeholder="0x12312" value={signal} onChange={(e) => setSignal(e.target.value)} />
                <p className="text-xs text-muted-foreground">Optional additional data to include in the verification</p>
              </div>

              <div className="space-y-2">
                <Label>Verification Level</Label>
                <Badge variant="outline">Orb</Badge>
                <p className="text-xs text-muted-foreground">Currently set to Orb verification level</p>
              </div>

              <Button
                onClick={handleVerify}
                disabled={loading || !isMiniKitInstalled || !walletAddress}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Verify with World ID
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Alert
              variant={result.success ? "default" : "destructive"}
              className={result.success ? "border-green-500 bg-green-50 dark:bg-green-950" : ""}
            >
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle className={result.success ? "text-green-900 dark:text-green-100" : ""}>
                {result.success ? "Verification Successful" : "Verification Failed"}
              </AlertTitle>
              <AlertDescription className={result.success ? "text-green-800 dark:text-green-200" : ""}>
                {result.error || "The user has been verified as a unique human."}
              </AlertDescription>
            </Alert>
          )}

          {result?.success && result.data && (
            <Card>
              <CardHeader>
                <CardTitle>Verification Details</CardTitle>
                <CardDescription>Proof information from World ID</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between items-start border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">Nullifier Hash</span>
                    <span className="text-sm font-mono text-right break-all max-w-[60%]">
                      {result.data.nullifier_hash}
                    </span>
                  </div>
                  <div className="flex justify-between items-start border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">Merkle Root</span>
                    <span className="text-sm font-mono text-right break-all max-w-[60%]">
                      {result.data.merkle_root}
                    </span>
                  </div>
                  <div className="flex justify-between items-start border-b pb-2">
                    <span className="text-sm font-medium text-muted-foreground">Verification Level</span>
                    <Badge variant="outline">{result.data.verification_level}</Badge>
                  </div>
                </div>

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                    View Proof Data
                  </summary>
                  <pre className="mt-2 p-4 bg-muted rounded-lg text-xs overflow-auto break-all">
                    {result.data.proof}
                  </pre>
                </details>
              </CardContent>
            </Card>
          )}

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">About World ID Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                World ID incognito actions allow you to verify unique humans without revealing their identity. This is
                perfect for creating bot-free experiences in games, voting systems, and more.
              </p>
              <p>
                The verification process uses zero-knowledge proofs to confirm a user is a unique human while
                maintaining their privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
