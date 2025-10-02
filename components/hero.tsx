import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="container relative px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-balance md:text-7xl">
            Discover Ethereal{" "}
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Ghost NFTs
            </span>{" "}
            on World Chain
          </h1>

          <p className="text-lg text-muted-foreground text-balance md:text-xl">
            The premier NFT marketplace on World Chain. Collect, trade, and discover hauntingly beautiful digital art in
            the ghostly realm of Web3.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Create NFT
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
