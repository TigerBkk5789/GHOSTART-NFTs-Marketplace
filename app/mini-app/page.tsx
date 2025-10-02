import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Smartphone, Download, QrCode, Apple, Play, Zap, Shield, Wallet } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Trade NFTs and tokens instantly with optimized mobile performance",
  },
  {
    icon: Shield,
    title: "Secure Wallet",
    description: "Your assets are protected with industry-leading security measures",
  },
  {
    icon: Wallet,
    title: "Easy Payments",
    description: "Seamless integration with World Chain for instant transactions",
  },
]

export default function MiniAppPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Smartphone className="h-4 w-4" />
            Now Available on Mobile
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
            GHOSTART
            <br />
            <span className="text-primary">Mini App</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Experience the full power of GHOSTART marketplace on your mobile device. Trade NFTs, swap tokens, and manage
            your collection anywhere.
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="gap-2 min-w-[200px] h-14 text-base bg-primary hover:bg-primary/90">
              <Apple className="h-5 w-5" />
              Download for iOS
            </Button>
            <Button size="lg" variant="outline" className="gap-2 min-w-[200px] h-14 text-base bg-transparent">
              <Play className="h-5 w-5" />
              Download for Android
            </Button>
          </div>

          {/* QR Code Section */}
          <Card className="inline-block p-6 border-border/40 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-6">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Scan to Download</h3>
                </div>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  Scan this QR code with your phone camera to download the app
                </p>
              </div>
              <div className="w-32 h-32 bg-secondary rounded-lg flex items-center justify-center border-2 border-border">
                <Image src="/qr-code-for-ghostart-app-download.jpg" alt="QR Code" width={128} height={128} className="rounded" />
              </div>
            </div>
          </Card>
        </div>

        {/* Mobile Mockup Section */}
        <div className="mb-16">
          <div className="relative max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Left Phone */}
              <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur">
                <div className="aspect-[9/19] relative bg-secondary">
                  <Image src="/ghostart-mobile-app-marketplace-screen-showing-nft.jpg" alt="Marketplace Screen" fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">Browse NFTs</h3>
                  <p className="text-sm text-muted-foreground">Explore collections on the go</p>
                </div>
              </Card>

              {/* Center Phone (Featured) */}
              <Card className="overflow-hidden border-2 border-primary/50 bg-card/50 backdrop-blur shadow-lg shadow-primary/20 md:scale-110">
                <div className="aspect-[9/19] relative bg-secondary">
                  <Image src="/ghostart-mobile-app-trading-screen-with-token-swap.jpg" alt="Trading Screen" fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">Trade Instantly</h3>
                  <p className="text-sm text-muted-foreground">Swap tokens with one tap</p>
                </div>
              </Card>

              {/* Right Phone */}
              <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur">
                <div className="aspect-[9/19] relative bg-secondary">
                  <Image src="/ghostart-mobile-app-wallet-screen-showing-token-ba.jpg" alt="Wallet Screen" fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">Manage Wallet</h3>
                  <p className="text-sm text-muted-foreground">Track your portfolio</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GHOSTART Mini App?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <Card className="p-8 border-border/40 bg-card/50 backdrop-blur mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary mb-1">50K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-1">1M+</p>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-1">4.8★</p>
              <p className="text-sm text-muted-foreground">App Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-1">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download the GHOSTART Mini App today and join thousands of users trading NFTs and tokens on World Chain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 min-w-[200px] h-14 text-base bg-primary hover:bg-primary/90">
              <Download className="h-5 w-5" />
              Download Now
            </Button>
            <Button size="lg" variant="outline" className="gap-2 min-w-[200px] h-14 text-base bg-transparent">
              View on PUF World
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
