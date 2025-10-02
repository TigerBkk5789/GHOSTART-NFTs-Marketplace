import { Header } from "@/components/header"
import { TradingBanner } from "@/components/trading-banner"
import { PartnershipBanner } from "@/components/partnership-banner"
import { Hero } from "@/components/hero"
import { FeaturedCollections } from "@/components/featured-collections"
import { TrendingNFTs } from "@/components/trending-nfts"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"
import { VerificationGuard } from "@/components/verification-guard"

export default function Home() {
  return (
    <VerificationGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <TradingBanner />
        <PartnershipBanner />
        <main className="space-y-8">
          <Hero />
          <Stats />
          <FeaturedCollections />
          <TrendingNFTs />
        </main>
        <Footer />
      </div>
    </VerificationGuard>
  )
}
