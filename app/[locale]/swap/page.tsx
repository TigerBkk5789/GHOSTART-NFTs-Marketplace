import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpDown, ArrowRight, TrendingUp, Lock, ExternalLink, RefreshCw } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default async function SwapPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)
  const pufLink =
    "https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
        <div className="w-full max-w-2xl space-y-6">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center space-y-3 pb-4">
              <div className="flex justify-center mb-2">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src="/ghostart-token-new.png"
                    alt="GHOSTART Token"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-primary shadow-lg"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-balance">Token Swap</CardTitle>
              <CardDescription className="text-base md:text-lg">Swap between WLD and $GHOSTART tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-900 dark:text-green-100">Live Trading Available</AlertTitle>
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Trade $GHOSTART tokens on the PUF marketplace with real-time pricing and liquidity.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <ArrowUpDown className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Instant Swaps</p>
                      <p className="text-sm text-muted-foreground">Swap tokens instantly with competitive rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Lock className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">Secure Trading</p>
                      <p className="text-sm text-muted-foreground">All swaps are secured by smart contracts</p>
                    </div>
                  </div>
                </div>

                {/* Swap Interface */}
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Swap Tokens</h3>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="from-amount">From</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="from-amount" 
                          placeholder="0.0" 
                          className="flex-1"
                        />
                        <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted">
                          <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-medium">WLD</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="to-amount">To</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="to-amount" 
                          placeholder="0.0" 
                          className="flex-1"
                          readOnly
                        />
                        <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted">
                          <Image
                            src="/ghostart-token-new.png"
                            alt="GHOSTART"
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span className="text-sm font-medium">GHOSTART</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      Rate: 1 GHOSTART = $0.000009 USDT
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full" size="lg">
                  <a
                    href={pufLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Trade on PUF Marketplace
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-2xl md:text-3xl text-balance">Trading Information</CardTitle>
              <CardDescription className="text-base">Current market data and trading pairs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-semibold">Available Pairs</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                        <span className="font-medium">WLD</span>
                        <ArrowRight className="h-4 w-4" />
                        <Image
                          src="/ghostart-token-new.png"
                          alt="GHOSTART"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-medium">GHOSTART</span>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Price Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Current Rate</span>
                      <span className="font-medium">1 GHOSTART = $0.000009 USDT</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">24h Volume</span>
                      <span className="font-medium">Loading...</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">Liquidity</span>
                      <span className="font-medium">Available</span>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">Trade on PUF</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  For the best trading experience and real-time prices, use the PUF marketplace directly.
                </AlertDescription>
              </Alert>

              <Button asChild className="w-full bg-transparent" size="lg" variant="outline">
                <Link href={`/${locale}`} className="flex items-center justify-center gap-2">
                  Back to Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

