"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ghost, Shield, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { useVerification } from "@/contexts/verification-context"

declare global {
  interface Window {
    MiniKit: any
  }
}

export default function VerifyPage() {
  const router = useRouter()
  const { isVerified, verify } = useVerification()
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMiniKitReady, setIsMiniKitReady] = useState(false)
  const [isInWorldApp, setIsInWorldApp] = useState<boolean | null>(null)

  useEffect(() => {
    if (isVerified) {
      router.push("/")
      return
    }

    const initMiniKit = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (typeof window !== "undefined" && window.MiniKit) {
          // Check if MiniKit is installed (running in World App)
          if (window.MiniKit.isInstalled()) {
            setIsMiniKitReady(true)
            setIsInWorldApp(true)
            console.log("[v0] MiniKit is installed and ready")
          } else {
            console.log("[v0] Not running in World App")
            setIsInWorldApp(false)
          }
        } else {
          console.log("[v0] MiniKit not available")
          setIsInWorldApp(false)
        }
      } catch (err) {
        console.error("[v0] Failed to initialize MiniKit:", err)
        setIsInWorldApp(false)
      }
    }

    initMiniKit()
  }, [isVerified, router])

  const handleDemoMode = () => {
    console.log("[v0] Using demo mode for preview")
    localStorage.setItem("ghostart_verified", "true")
    localStorage.setItem("ghostart_nullifier_hash", "demo_" + Date.now())
    verify()
    router.push("/")
  }

  const handleVerify = async () => {
    if (!isMiniKitReady || !window.MiniKit) {
      setError("World App SDK not ready. Please wait and try again.")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // Use the async verify command as per documentation
      const { finalPayload } = await window.MiniKit.commandsAsync.verify({
        action: process.env.NEXT_PUBLIC_ACTION_ID || "verify-human",
        signal: "",
        verification_level: "orb",
      })

      console.log("[v0] Verification payload received:", finalPayload)

      if (finalPayload.status === "error") {
        throw new Error(finalPayload.error_code || "Verification failed")
      }

      // Send proof to backend for verification
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload,
          action: process.env.NEXT_PUBLIC_ACTION_ID || "verify-human",
          signal: "",
        }),
      })

      const data = await response.json()
      console.log("[v0] Backend verification response:", data)

      if (!response.ok) {
        throw new Error(data.error || "Backend verification failed")
      }

      if (data.verifyRes?.success) {
        localStorage.setItem("ghostart_verified", "true")
        localStorage.setItem("ghostart_nullifier_hash", finalPayload.nullifier_hash)
        verify()
        router.push("/")
      } else {
        throw new Error(data.verifyRes?.detail || "Verification failed")
      }
    } catch (err) {
      console.error("[v0] Verification error:", err)
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Ghost className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to GHOSTART</CardTitle>
          <CardDescription className="text-base">
            Verify your World ID to access the ethereal NFT marketplace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Proof of Personhood</h3>
                <p className="text-sm text-muted-foreground">
                  Verify you're a unique human to prevent bots and ensure fair trading
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">One-Time Verification</h3>
                <p className="text-sm text-muted-foreground">Complete this once to access all marketplace features</p>
              </div>
            </div>
          </div>

          {isInWorldApp === false && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-500">Preview Mode</p>
                  <p className="text-xs text-muted-foreground">
                    World ID verification requires World App. Use demo mode to preview the marketplace.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {isInWorldApp === true ? (
            <Button onClick={handleVerify} disabled={isVerifying || !isMiniKitReady} className="w-full" size="lg">
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Verify with World ID
                </>
              )}
            </Button>
          ) : isInWorldApp === false ? (
            <Button onClick={handleDemoMode} className="w-full bg-transparent" size="lg" variant="outline">
              <Ghost className="w-4 h-4 mr-2" />
              Continue in Demo Mode
            </Button>
          ) : (
            <Button disabled className="w-full" size="lg">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </Button>
          )}

          <p className="text-xs text-center text-muted-foreground">
            By verifying, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
