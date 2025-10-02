import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Filter, Grid3x3, List, TrendingUp } from "lucide-react"
import Image from "next/image"

const categories = ["All", "Art", "Gaming", "Music", "Photography", "Sports", "Utility"]

const nfts = [
  {
    id: 1,
    name: "Cosmic Alien #4521",
    collection: "Cosmic Creatures",
    price: "12.5",
    image: "/cosmic-alien-creature-nft.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Pixel Warrior #892",
    collection: "Pixel Warriors",
    price: "8.3",
    image: "/pixel-art-warrior-nft.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Abstract Portal #156",
    collection: "Abstract Dimensions",
    price: "15.7",
    image: "/abstract-3d-portal-nft.jpg",
    verified: false,
  },
  {
    id: 4,
    name: "Cyberpunk Samurai #2341",
    collection: "Cyber Legends",
    price: "22.1",
    image: "/cyberpunk-samurai-nft.jpg",
    verified: true,
  },
  {
    id: 5,
    name: "Nebula Beast #678",
    collection: "Space Creatures",
    price: "9.8",
    image: "/nebula-space-beast-nft.jpg",
    verified: true,
  },
  {
    id: 6,
    name: "Ghost Spirit #1234",
    collection: "Ethereal Ghosts",
    price: "18.5",
    image: "/ethereal-ghost-spirit-nft.jpg",
    verified: true,
  },
  {
    id: 7,
    name: "Digital Dragon #445",
    collection: "Mythic Beasts",
    price: "31.2",
    image: "/digital-dragon-nft-art.jpg",
    verified: true,
  },
  {
    id: 8,
    name: "Neon City #789",
    collection: "Urban Futures",
    price: "14.6",
    image: "/neon-cyberpunk-city-nft.jpg",
    verified: false,
  },
  {
    id: 9,
    name: "Crystal Skull #321",
    collection: "Mystic Artifacts",
    price: "27.4",
    image: "/crystal-skull-mystical-nft.jpg",
    verified: true,
  },
  {
    id: 10,
    name: "Quantum Orb #567",
    collection: "Quantum Realm",
    price: "19.9",
    image: "/quantum-energy-orb-nft.jpg",
    verified: true,
  },
  {
    id: 11,
    name: "Void Walker #888",
    collection: "Dark Dimensions",
    price: "25.3",
    image: "/void-walker-dark-nft.jpg",
    verified: false,
  },
  {
    id: 12,
    name: "Phoenix Rising #111",
    collection: "Legendary Birds",
    price: "42.7",
    image: "/phoenix-fire-bird-nft.jpg",
    verified: true,
  },
]

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Explore NFTs</h1>
          <p className="text-muted-foreground text-lg">
            Discover, collect, and trade unique digital assets on World Chain
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "bg-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <TrendingUp className="h-4 w-4" />
              Price: Low to High
            </Button>
            <div className="hidden md:flex gap-1 border border-border rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 bg-secondary">
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <Card
              key={nft.id}
              className="group overflow-hidden border-border/40 bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {nft.verified && (
                  <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Verified
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <p className="text-xs text-muted-foreground mb-1">{nft.collection}</p>
                  <h3 className="font-semibold text-lg leading-tight">{nft.name}</h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-bold text-lg">{nft.price} WLD</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Buy Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent">
            Load More NFTs
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
