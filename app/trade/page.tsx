"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Star, Flame, Trophy } from "lucide-react"
import { useState } from "react"

const categories = ["All", "Alpha Tokens", "Meme Coins", "Top Coins"]

const tokens = [
  {
    id: 1,
    name: "GHOSTART",
    symbol: "GHOSTART",
    price: "0.000009",
    change: "+15.5",
    volume: "277.7M",
    marketCap: "2.5M",
    category: "Alpha Tokens",
    trending: true,
  },
  {
    id: 2,
    name: "Worldcoin",
    symbol: "WLD",
    price: "2.45",
    change: "+8.2",
    volume: "125.3M",
    marketCap: "1.2B",
    category: "Top Coins",
    trending: true,
  },
  {
    id: 3,
    name: "Pepe Ghost",
    symbol: "PGHOST",
    price: "0.00012",
    change: "+245.7",
    volume: "89.4M",
    marketCap: "45.2M",
    category: "Meme Coins",
    trending: true,
  },
  {
    id: 4,
    name: "Ethereum",
    symbol: "ETH",
    price: "3,245.67",
    change: "+3.4",
    volume: "15.2B",
    marketCap: "390B",
    category: "Top Coins",
    trending: false,
  },
  {
    id: 5,
    name: "Spooky Inu",
    symbol: "SPOOK",
    price: "0.000045",
    change: "+187.3",
    volume: "34.5M",
    marketCap: "12.8M",
    category: "Meme Coins",
    trending: true,
  },
  {
    id: 6,
    name: "Ghost Protocol",
    symbol: "GPRO",
    price: "0.0234",
    change: "+42.1",
    volume: "18.9M",
    marketCap: "8.7M",
    category: "Alpha Tokens",
    trending: true,
  },
  {
    id: 7,
    name: "Bitcoin",
    symbol: "BTC",
    price: "67,234.12",
    change: "+2.1",
    volume: "28.4B",
    marketCap: "1.3T",
    category: "Top Coins",
    trending: false,
  },
  {
    id: 8,
    name: "Phantom Doge",
    symbol: "PDOG",
    price: "0.00089",
    change: "+156.4",
    volume: "56.2M",
    marketCap: "23.4M",
    category: "Meme Coins",
    trending: true,
  },
  {
    id: 9,
    name: "Spirit Chain",
    symbol: "SPRT",
    price: "0.156",
    change: "+28.9",
    volume: "12.3M",
    marketCap: "5.2M",
    category: "Alpha Tokens",
    trending: false,
  },
  {
    id: 10,
    name: "Solana",
    symbol: "SOL",
    price: "145.23",
    change: "+5.7",
    volume: "2.8B",
    marketCap: "65B",
    category: "Top Coins",
    trending: false,
  },
  {
    id: 11,
    name: "Haunted Shiba",
    symbol: "HSHIB",
    price: "0.000067",
    change: "-12.3",
    volume: "28.7M",
    marketCap: "15.6M",
    category: "Meme Coins",
    trending: false,
  },
  {
    id: 12,
    name: "Ethereal Finance",
    symbol: "ETHF",
    price: "0.0456",
    change: "+67.8",
    volume: "9.8M",
    marketCap: "3.4M",
    category: "Alpha Tokens",
    trending: true,
  },
]

export default function TradePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTokens =
    selectedCategory === "All" ? tokens : tokens.filter((token) => token.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Token Trading</h1>
          <p className="text-muted-foreground text-lg">
            Trade alpha tokens, meme coins, and top cryptocurrencies on World Chain
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary" : "bg-transparent"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Trending Now</h3>
            </div>
            <p className="text-3xl font-bold mb-1">8</p>
            <p className="text-sm text-muted-foreground">Tokens gaining momentum</p>
          </Card>

          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-semibold">24h Volume</h3>
            </div>
            <p className="text-3xl font-bold mb-1">$45.2B</p>
            <p className="text-sm text-green-500">+12.4% from yesterday</p>
          </Card>

          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Top Gainer</h3>
            </div>
            <p className="text-3xl font-bold mb-1">PGHOST</p>
            <p className="text-sm text-green-500">+245.7% today</p>
          </Card>
        </div>

        {/* Token Table */}
        <Card className="border-border/40 bg-card/50 backdrop-blur overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">#</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">24h Change</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Volume</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Market Cap</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token, index) => (
                  <tr key={token.id} className="border-b border-border/40 hover:bg-secondary/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{index + 1}</span>
                        {token.trending && <Star className="h-4 w-4 text-primary fill-primary" />}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                          {token.symbol[0]}
                        </div>
                        <div>
                          <p className="font-semibold">{token.name}</p>
                          <p className="text-sm text-muted-foreground">{token.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">${token.price}</p>
                    </td>
                    <td className="p-4">
                      <div
                        className={`flex items-center gap-1 ${Number.parseFloat(token.change) >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {Number.parseFloat(token.change) >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-semibold">{token.change}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-muted-foreground">${token.volume}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-muted-foreground">${token.marketCap}</p>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {token.category}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Trade
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
