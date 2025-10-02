import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css"
import { MiniKitProvider } from "@/components/minikit-provider"
import { Suspense } from "react"
import { locales, type Locale } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileNav } from "@/components/mobile-nav"
import { TradingBanner } from "@/components/trading-banner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "GHOSTART",
  description:
    "Verify unique humans with privacy-preserving World ID technology. Bot-free experiences for your community.",
  generator: "v0.app",
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  return (
    <html lang={params.locale}>
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <MiniKitProvider>
            <TradingBanner />
            <div className="fixed top-4 right-4 z-50">
              <LanguageSwitcher currentLocale={params.locale} />
            </div>
            <div className="pt-16 pb-16 md:pb-0">{children}</div>
            <MobileNav locale={params.locale} />
          </MiniKitProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
