import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Smartphone, ArrowRight, TrendingUp, Lock, ExternalLink } from "lucide-react"
import { getTranslations, type Locale } from "@/lib/translations"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const t = getTranslations(params.locale)
  const appId = process.env.NEXT_PUBLIC_APP_ID || ""
  const pufLink =
    "https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
        <div className="w-full max-w-2xl space-y-6">
          <Card className="border-2 border-primary">
            <CardHeader className="text-center space-y-3 pb-4">
              <div className="flex justify-center mb-2">
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <Image
                    src="/ghostart-cryptocurrency-coin-logo.jpg"
                    alt="GHOSTART Token"
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-primary shadow-lg"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CardTitle className="text-3xl md:text-4xl font-bold text-balance">$GHOSTART</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Early Trading
                </Badge>
              </div>
              <CardDescription className="text-base md:text-lg">{t.home.tokenSubtitle}</CardDescription>
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

                <Button asChild className="w-full" size="lg">
                  <a
                    href={pufLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    {t.home.tradeButton}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-2xl md:text-3xl text-balance">{t.home.title}</CardTitle>
              <CardDescription className="text-base">{t.home.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">Mobile Only</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">{t.home.mobileOnly}</AlertDescription>
              </Alert>

              <p className="text-sm text-muted-foreground text-pretty">{t.home.content}</p>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{t.home.qrTitle}</h3>
                  <p className="text-sm text-muted-foreground text-pretty">{t.home.qrDescription}</p>
                </div>
                <QRCodeGenerator appId={appId} hideInput={!!appId} baseUrl="https://www.ghostart.world" />
              </div>

              <Button asChild className="w-full bg-transparent" size="lg" variant="outline">
                <Link href={`/${params.locale}/verify`} className="flex items-center justify-center gap-2">
                  {t.home.button}
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
