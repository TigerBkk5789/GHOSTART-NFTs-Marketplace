import { Card } from "@/components/ui/card"
import { TrendingUp, Coins } from "lucide-react"
import Image from "next/image"

export function FeaturedCollections() {
  const collections = [
    {
      name: "Cosmic Creatures",
      floor: "12.5 WLD",
      volume: "2.5K WLD",
      change: "+15.2%",
      image: "/cosmic-alien-creature-nft-art.jpg",
    },
    {
      name: "Pixel Warriors",
      floor: "8.3 WLD",
      volume: "1.8K WLD",
      change: "+8.7%",
      image: "/pixel-art-warrior-nft.jpg",
    },
    {
      name: "Abstract Dimensions",
      floor: "15.0 WLD",
      volume: "3.2K WLD",
      change: "+22.1%",
      image: "/abstract-3d-art-nft.jpg",
    },
    {
      name: "Cyber Punks Elite",
      floor: "20.5 WLD",
      volume: "4.1K WLD",
      change: "+18.5%",
      image: "/cyberpunk-character-nft.jpg",
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="container px-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold md:text-4xl">Featured Collections</h2>
            <p className="text-muted-foreground">Trending NFT collections on GHOSTART</p>
          </div>
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {collections.map((collection) => (
            <Card
              key={collection.name}
              className="group overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold">{collection.name}</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor Price</span>
                    <div className="flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold">{collection.floor}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <div className="flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold">{collection.volume}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Change</span>
                    <span className="font-semibold text-green-500">{collection.change}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
