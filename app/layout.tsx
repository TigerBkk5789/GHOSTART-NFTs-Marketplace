import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { VerificationProvider } from "@/contexts/verification-context"

const geistSans = GeistSans
const geistMono = GeistMono

export const metadata: Metadata = {
  title: "GHOSTART - World Chain NFT Marketplace",
  description:
    "Discover, collect, and trade ethereal NFTs on World Chain. The premier marketplace for ghost-themed digital art.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased">
        <script src="https://cdn.jsdelivr.net/npm/@worldcoin/minikit-js@0.0.52/dist/minikit.js" async />
        <VerificationProvider>{children}</VerificationProvider>
      </body>
    </html>
  )
}
