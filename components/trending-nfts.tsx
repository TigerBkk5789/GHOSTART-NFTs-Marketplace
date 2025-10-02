import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Coins } from "lucide-react"
import Image from "next/image"

export function TrendingNFTs() {
  const nfts = [
    {
      name: "Galactic Explorer #4521",
      collection: "Cosmic Creatures",
      price: "12.5 SOL",
      image: "/space-explorer-nft-character.jpg",
      rarity: "Legendary",
    },
    {
      name: "Warrior King #892",
      collection: "Pixel Warriors",
      price: "8.3 SOL",
      image: "/pixel-warrior-king-nft.jpg",
      rarity: "Epic",
    },
    {
      name: "Dimension Portal #156",
      collection: "Abstract Dimensions",
      price: "15.0 SOL",
      image: "/abstract-portal-nft-art.jpg",
      rarity: "Rare",
    },
    {
      name: "Cyber Samurai #2341",
      collection: "Cyber Punks Elite",
      price: "20.5 SOL",
      image: "/cyberpunk-samurai-nft.jpg",
      rarity: "Legendary",
    },
    {
      name: "Nebula Beast #7788",
      collection: "Cosmic Creatures",
      price: "14.2 SOL",
      image: "/nebula-beast-creature-nft.jpg",
      rarity: "Epic",
    },
    {
      name: "Digital Ronin #445",
      collection: "Pixel Warriors",
      price: "9.8 SOL",
      image: "/pixel-ronin-warrior-nft.jpg",
      rarity: "Rare",
    },
  ]

  return (
    <section className="border-t border-border/40 bg-secondary/30 py-12 md:py-16">
      <div className="container px-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold md:text-4xl">Trending NFTs</h2>
            <p className="text-muted-foreground">Hot items being traded right now</p>
          </div>
          <Flame className="h-8 w-8 text-primary" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {nfts.map((nft) => (
            <Card
              key={nft.name}
              className="group overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge className="absolute right-3 top-3 bg-primary/90 text-primary-foreground">{nft.rarity}</Badge>
              </div>
              <div className="p-6">
                <p className="mb-2 text-xs text-muted-foreground">{nft.collection}</p>
                <h3 className="mb-4 text-lg font-semibold">{nft.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Price</span>
                  <div className="flex items-center gap-1.5">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold text-primary">{nft.price}</span>
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
