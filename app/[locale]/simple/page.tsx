import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Lock, ExternalLink, ArrowRight } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import Image from "next/image"

export default async function SimplePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            $GHOSTART
          </h1>
          <Badge className="text-lg px-4 py-2 bg-green-100 text-green-800 border-green-200">
            🚀 Early Trading Available
          </Badge>
          <p className="text-xl text-gray-600 mt-4">
            NFT Marketplace on World Chain
          </p>
        </div>

        {/* Main Card */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Welcome to GHOSTART</CardTitle>
            <CardDescription className="text-lg">
              Trade, mint, and collect NFTs with WLD and $GHOSTART tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">Early Trading</h3>
                </div>
                <p className="text-sm text-purple-700">Get in early on GHOSTART tokens</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-green-900">Secure Trading</h3>
                </div>
                <p className="text-sm text-green-700">All trades secured by smart contracts</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200" size="lg">
                <a
                  href="https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  🚀 Trade on PUF
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              
              <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200" size="lg">
                <Link href={`/${locale}/marketplace`} className="flex items-center justify-center gap-2">
                  🎨 Browse Marketplace
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-bold text-lg mb-2">NFT Marketplace</h3>
              <p className="text-sm text-gray-600 mb-4">Browse and trade unique NFTs</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${locale}/marketplace`}>Explore</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="font-bold text-lg mb-2">Free Minting</h3>
              <p className="text-sm text-gray-600 mb-4">Create your own NFTs for free</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${locale}/claim`}>Mint Now</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-bold text-lg mb-2">Token Swap</h3>
              <p className="text-sm text-gray-600 mb-4">Swap between WLD and GHOSTART</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${locale}/swap`}>Swap Tokens</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
