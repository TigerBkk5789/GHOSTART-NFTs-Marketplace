import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Gift, ArrowRight, TrendingUp, Lock, ExternalLink, CheckCircle2, Clock } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { Footer } from "@/components/footer"
import { formatLargeNumber, getCurrentPriceDisplay } from "@/lib/formatting"
import Image from "next/image"

export default async function ClaimPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
        <div className="w-full max-w-2xl space-y-6">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center space-y-3 pb-4">
              <div className="flex justify-center mb-2">
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <Image
                    src="/ghostart-token-new.png"
                    alt="GHOSTART NFT"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-primary shadow-lg"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <Gift className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CardTitle className="text-3xl md:text-4xl font-bold text-balance">Free NFT Claim</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Limited Time
                </Badge>
              </div>
              <CardDescription className="text-base md:text-lg">Claim your free GHOSTART NFT - No cost required!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <Gift className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-900 dark:text-green-100">Free NFT Available</AlertTitle>
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Claim your exclusive GHOSTART NFT completely free! Limited to 1 NFT per wallet.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Gift className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">100% Free Minting</p>
                      <p className="text-sm text-muted-foreground">No gas fees, no payment required</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Lock className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">One Per Wallet</p>
                      <p className="text-sm text-muted-foreground">Limited to prevent spam and ensure fairness</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <TrendingUp className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Early Access Benefits</p>
                      <p className="text-sm text-muted-foreground">Get priority access to future drops and features</p>
                    </div>
                  </div>
                </div>

                {/* Claim Interface */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Claim Your Free NFT</h3>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Limited Time
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">Free</div>
                      <p className="text-sm text-muted-foreground">No payment required</p>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Connect your World App wallet</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Verify your identity (one-time)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Claim your free NFT</span>
                      </div>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      Estimated time: 30 seconds
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Gift className="mr-2 h-4 w-4" />
                  Claim Free NFT Now
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    By claiming, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-2xl md:text-3xl text-balance">NFT Collection Info</CardTitle>
              <CardDescription className="text-base">Learn more about your free NFT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-semibold">Collection Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Total Supply</span>
                      <span className="font-medium">10K NFTs</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Free Claims</span>
                      <span className="font-medium">1K NFTs</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Remaining</span>
                      <span className="font-medium text-green-600">847 NFTs</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Current Price</span>
                      <span className="font-medium">{getCurrentPriceDisplay()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">NFT Benefits</h3>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">Early Access</p>
                      <p className="text-xs text-muted-foreground">Priority for future drops</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">Community Access</p>
                      <p className="text-xs text-muted-foreground">Join exclusive Discord</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-sm">Future Rewards</p>
                      <p className="text-xs text-muted-foreground">Earn $GHOSTART tokens</p>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">View Collection</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  Check out the full GHOSTART NFT collection and see what other NFTs are available.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button asChild className="flex-1" variant="outline">
                  <Link href={`/${locale}/swap`} className="flex items-center justify-center gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Trade Tokens
                  </Link>
                </Button>
                <Button asChild className="flex-1" variant="outline">
                  <Link href={`/${locale}`} className="flex items-center justify-center gap-2">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

