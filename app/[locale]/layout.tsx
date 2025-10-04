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
import { WorldChainBanner } from "@/components/world-chain-banner"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "GHOSTART NFT Marketplace",
  description:
    "GHOSTART NFT Marketplace on World Chain - Trade, mint, and claim NFTs with World ID verification. Built with MiniKit template.",
  generator: "MiniKit Template",
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}>) {
  const { locale } = await params
  
  return (
    <html lang={locale}>
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <MiniKitProvider>
            <WorldChainBanner locale={locale} />
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
              <ConnectWalletButton />
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <div className="pt-20 pb-32 md:pb-0">{children}</div>
            <MobileNav locale={locale} />
          </MiniKitProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
