import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Smartphone, ArrowRight, TrendingUp, Lock, ExternalLink } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)
  const appId = process.env.NEXT_PUBLIC_APP_ID || "app_cc2463e69dbce149c2073d4ca593af75"
  const pufLink = "https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="p-4 space-y-6">
          {/* Hero Section */}
          <Card className="border-2 border-primary shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                  <Image
                    src="/ghostart-cryptocurrency-coin-logo.jpg"
                    alt="GHOSTART Token"
                    width={128}
                    height={128}
                    className="rounded-full border-4 border-white shadow-2xl relative z-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <CardTitle className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                    $GHOSTART
                  </CardTitle>
                  <Badge variant="secondary" className="text-sm px-3 py-1 bg-green-100 text-green-800 border-green-200">
                    🚀 Early Trading
                  </Badge>
                </div>
                <CardDescription className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  {t.home.tokenSubtitle}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-900 dark:text-green-100">{t.home.potentialTitle}</AlertTitle>
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {t.home.potentialDesc}
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Lock className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{t.home.launchConditionTitle}</p>
                      <p className="text-sm text-muted-foreground">{t.home.launchConditionDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <TrendingUp className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm">{t.home.earlyAccessTitle}</p>
                      <p className="text-sm text-muted-foreground">{t.home.earlyAccessDesc}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200" size="lg">
                    <a
                      href={pufLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      🚀 {t.home.tradeButton}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Or scan QR code to open in World App</p>
                    <QRCodeGenerator appId={appId} hideInput={!!appId} baseUrl="https://ghostart-nft-marketplace-gpl16mhr5.vercel.app" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-2xl md:text-3xl text-balance bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t.home.title}
              </CardTitle>
              <CardDescription className="text-base">{t.home.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Feature Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100">Early Trading</h3>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Get in early on GHOSTART before the official launch</p>
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Lock className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">Secure Trading</h3>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">All trades secured by smart contracts on World Chain</p>
                </div>
              </div>

              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">Mobile Only</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">{t.home.mobileOnly}</AlertDescription>
              </Alert>

              <p className="text-sm text-muted-foreground text-pretty text-center">{t.home.content}</p>

              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200" size="lg">
                <Link href={`/${locale}/verify`} className="flex items-center justify-center gap-2">
                  🔐 {t.home.button}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
      </div>
    </div>
  )
}