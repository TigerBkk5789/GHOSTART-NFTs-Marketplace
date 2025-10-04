"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Gift, ExternalLink } from "lucide-react"

export default function JoinPage() {
  const params = useParams()
  const code = params.code as string
  const [isRedirecting, setIsRedirecting] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const redirectToMiniApp = async () => {
      try {
        if (!code) {
          setError("Invalid referral code")
          setIsRedirecting(false)
          return
        }

        // Construct the mini app URL with the referral code
        const appId = process.env.NEXT_PUBLIC_APP_ID || "app_cc2463e69dbce149c2073d4ca593af75"
        const miniAppUrl = `https://world.org/mini-app?app_id=${appId}&path=/invite?code=${code}`
        
        // Add a small delay to show the loading state
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Redirect to the mini app
        window.location.href = miniAppUrl
        
      } catch (error) {
        console.error('Redirect error:', error)
        setError("Failed to redirect to mini app")
        setIsRedirecting(false)
      }
    }

    redirectToMiniApp()
  }, [code])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = 'https://world.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75'}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Go to GHOSTART
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle>Welcome to GHOSTART! 🎨</CardTitle>
          <CardDescription>
            Redirecting you to the NFT marketplace...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
          
          <Alert className="bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-200">
            <Gift className="h-4 w-4" />
            <AlertDescription>
              <strong>Referral Code:</strong> {code}
              <br />
              You'll receive 50 GHOSTART tokens + 1 free NFT mint when you join!
            </AlertDescription>
          </Alert>

          <div className="text-sm text-muted-foreground">
            <p>Opening World App...</p>
            <p>If the app doesn't open automatically, tap the button below:</p>
          </div>

          <Button 
            onClick={() => {
              const appId = process.env.NEXT_PUBLIC_APP_ID || "app_cc2463e69dbce149c2073d4ca593af75"
              window.location.href = `https://world.org/mini-app?app_id=${appId}&path=/invite?code=${code}`
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in World App
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


