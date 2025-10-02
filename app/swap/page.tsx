"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDownUp, Settings, Info, ExternalLink } from "lucide-react"
import { useState } from "react"

const tokens = [
  { symbol: "ETH", name: "Ethereum", balance: "0.00" },
  { symbol: "WLD", name: "Worldcoin", balance: "0.00" },
  { symbol: "GHOSTART", name: "Ghost Art Token", balance: "0.00" },
  { symbol: "USDC", name: "USD Coin", balance: "0.00" },
  { symbol: "USDT", name: "Tether", balance: "0.00" },
]

export default function SwapPage() {
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[2])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Token Swap</h1>
            <p className="text-muted-foreground">Trade tokens instantly on Ethereum and World Chain</p>
          </div>

          {/* Swap Card */}
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Swap</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* From Token */}
            <div className="space-y-2 mb-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">From</span>
                <span className="text-muted-foreground">Balance: {fromToken.balance}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary border border-border/40">
                <input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-2xl font-semibold"
                />
                <Button variant="outline" className="gap-2 min-w-[120px] bg-background">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    {fromToken.symbol[0]}
                  </div>
                  {fromToken.symbol}
                </Button>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapTokens}
                className="rounded-full bg-background border-2 hover:bg-secondary"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>

            {/* To Token */}
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">To</span>
                <span className="text-muted-foreground">Balance: {toToken.balance}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary border border-border/40">
                <input
                  type="number"
                  placeholder="0.0"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-2xl font-semibold"
                />
                <Button variant="outline" className="gap-2 min-w-[120px] bg-background">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    {toToken.symbol[0]}
                  </div>
                  {toToken.symbol}
                </Button>
              </div>
            </div>

            {/* Swap Info */}
            <div className="mt-6 p-4 rounded-lg bg-secondary/50 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium">
                  1 {fromToken.symbol} = 0.000009 {toToken.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="font-medium">~$2.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Slippage Tolerance</span>
                <span className="font-medium">0.5%</span>
              </div>
            </div>

            {/* Swap Button */}
            <Button className="w-full mt-6 h-12 text-base bg-primary hover:bg-primary/90">
              Connect Wallet to Swap
            </Button>
          </Card>

          {/* Contract Info */}
          <Card className="mt-6 p-6 border-border/40 bg-card/50 backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Swap Contract Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our swap contract is deployed on Ethereum mainnet, enabling secure and efficient token exchanges with
                  minimal fees.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">Contract Address</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono">0x4df0...Db990</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">Network</span>
                    <span className="text-sm font-medium">Ethereum Mainnet</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm text-muted-foreground">Protocol Version</span>
                    <span className="text-sm font-medium">v2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Supported Tokens */}
          <Card className="mt-6 p-6 border-border/40 bg-card/50 backdrop-blur">
            <h3 className="font-semibold mb-4">Supported Tokens</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tokens.map((token) => (
                <div
                  key={token.symbol}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                    {token.symbol[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{token.symbol}</p>
                    <p className="text-xs text-muted-foreground">{token.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
