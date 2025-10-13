import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, TrendingUp, Shield, Zap } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import Link from "next/link"

export default async function SwapPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.swap.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t.swap.description}</p>
          </div>
        </div>

        {/* Live Trading Card */}
        <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg text-green-900 dark:text-green-100">{t.swap.liveTradingTitle}</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-green-800 dark:text-green-200 text-sm mb-4">{t.swap.liveTradingDesc}</p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              {t.swap.tradeOnPUF}
            </Button>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid gap-4">
          <Card className="border border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">{t.swap.instantSwapsTitle}</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{t.swap.instantSwapsDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">{t.swap.secureTradingTitle}</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">{t.swap.secureTradingDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.swap.tradingInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.swap.currentRate}</p>
                <p className="font-semibold text-green-600">1 GHOSTART = $0.000009</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.swap.volume24h}</p>
                <p className="font-semibold">$12,450</p>
              </div>
            </div>
            
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.swap.liquidity}</p>
              <p className="font-semibold">$45,230</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3">
            <Link href="https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990">
              {t.swap.tradeOnPUFTitle}
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${locale}`}>
              {t.swap.backToHome}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}