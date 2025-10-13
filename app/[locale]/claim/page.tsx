import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Gift, Clock, Shield, Users, ArrowLeft, ExternalLink } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import Link from "next/link"

export default async function ClaimPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.claim.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t.claim.description}</p>
          </div>
        </div>

        {/* Free NFT Alert */}
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <Gift className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-900 dark:text-green-100">{t.claim.freeNFTTitle}</AlertTitle>
          <AlertDescription className="text-green-800 dark:text-green-200">
            {t.claim.freeNFTDesc}
          </AlertDescription>
        </Alert>

        {/* Claim Process */}
        <Card className="border-2 border-primary">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t.claim.claimNFT}</CardTitle>
            <CardDescription>{t.claim.estimatedTime}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100">{t.claim.connectWallet}</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Connect your World App wallet</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <p className="font-semibold text-purple-900 dark:text-purple-100">{t.claim.verifyIdentity}</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">One-time verification with World ID</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100">{t.claim.claimFree}</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Get your free NFT instantly</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3">
              <Gift className="h-4 w-4 mr-2" />
              {t.claim.claimNFT}
            </Button>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.claim.nftBenefits}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">{t.claim.earlyAccess}</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">{t.claim.priorityDrops}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">{t.claim.communityAccess}</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{t.claim.joinDiscord}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100">{t.claim.futureRewards}</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">{t.claim.earnTokens}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collection Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.claim.collectionInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.claim.totalSupply}</p>
                <p className="font-semibold text-lg">10,000</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.claim.freeClaims}</p>
                <p className="font-semibold text-lg text-green-600">8,234</p>
              </div>
            </div>
            
            <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{t.claim.remaining}</p>
              <p className="font-semibold text-lg text-red-600">1,766</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3">
            <Link href={`/${locale}/verify`}>
              <Shield className="h-4 w-4 mr-2" />
              {t.claim.claimNFT}
            </Link>
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/${locale}/swap`}>
                <ExternalLink className="h-4 w-4 mr-2" />
                {t.claim.tradeTokens}
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href={`/${locale}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.claim.backToHome}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}