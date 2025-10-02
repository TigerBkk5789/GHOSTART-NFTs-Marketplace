import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layers, Rocket, LayoutDashboard, Coins, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

const creationOptions = [
  {
    icon: Layers,
    title: "NFT Collection",
    description: "Create and deploy your own NFT collection on World Chain",
    features: ["Custom smart contract", "Royalty settings", "Metadata management", "Batch minting"],
    cta: "Create Collection",
    href: "/create/collection",
    badge: "Popular",
  },
  {
    icon: Rocket,
    title: "NFT Presale",
    description: "Launch a presale campaign for your upcoming NFT drop",
    features: ["Whitelist management", "Tiered pricing", "Early bird rewards", "Automated distribution"],
    cta: "Launch Presale",
    href: "/create/presale",
    badge: null,
  },
  {
    icon: LayoutDashboard,
    title: "Creator Dashboard",
    description: "Manage your NFT drops, sales, and analytics in one place",
    features: ["Real-time analytics", "Revenue tracking", "Community insights", "Drop scheduling"],
    cta: "Access Dashboard",
    href: "/create/dashboard",
    badge: null,
  },
  {
    icon: Coins,
    title: "ERC721 Mint (Free)",
    description: "Mint individual NFTs on World Chain with zero gas fees",
    features: ["Free minting", "Instant deployment", "World Chain native", "No coding required"],
    cta: "Mint NFT",
    href: "/create/mint",
    badge: "Free",
  },
]

const steps = [
  {
    number: 1,
    title: "Choose Creation Type",
    description: "Select whether you want to create a collection, launch a presale, or mint individual NFTs",
  },
  {
    number: 2,
    title: "Configure Settings",
    description: "Set up your NFT details, pricing, royalties, and other parameters",
  },
  {
    number: 3,
    title: "Upload Assets",
    description: "Upload your artwork, metadata, and any additional files needed",
  },
  {
    number: 4,
    title: "Deploy & Launch",
    description: "Deploy your smart contract and launch your NFT project to the world",
  },
]

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Creator Tools
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
            Create & Launch
            <br />
            <span className="text-primary">Your NFT Project</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Everything you need to create, launch, and manage your NFT collection on World Chain. No coding required.
          </p>
        </div>

        {/* Creation Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {creationOptions.map((option, index) => (
            <Card
              key={index}
              className="p-6 border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                {option.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {option.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
              <p className="text-muted-foreground mb-6">{option.description}</p>

              <div className="space-y-2 mb-6">
                {option.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full gap-2 bg-primary hover:bg-primary/90 group-hover:gap-3 transition-all">
                {option.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {step.number < 4 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <Card className="p-8 border-border/40 bg-card/50 backdrop-blur mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Create on GHOSTART?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Low Fees</h3>
              <p className="text-sm text-muted-foreground">
                Minimal gas fees on World Chain make minting and trading affordable for everyone
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                No coding required. Our intuitive tools make NFT creation accessible to everyone
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Full Control</h3>
              <p className="text-sm text-muted-foreground">
                Manage your collections, track sales, and engage with your community all in one place
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
            <p className="text-3xl font-bold text-primary mb-1">2,500+</p>
            <p className="text-sm text-muted-foreground">Collections Created</p>
          </Card>
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
            <p className="text-3xl font-bold text-primary mb-1">50K+</p>
            <p className="text-sm text-muted-foreground">NFTs Minted</p>
          </Card>
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
            <p className="text-3xl font-bold text-primary mb-1">$2.5M+</p>
            <p className="text-sm text-muted-foreground">Creator Earnings</p>
          </Card>
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
            <p className="text-3xl font-bold text-primary mb-1">Free</p>
            <p className="text-sm text-muted-foreground">ERC721 Minting</p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who have launched successful NFT projects on GHOSTART. Start building today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 h-14 text-base bg-primary hover:bg-primary/90">
              <Layers className="h-5 w-5" />
              Create Collection
            </Button>
            <Button size="lg" variant="outline" className="gap-2 h-14 text-base bg-transparent">
              <Coins className="h-5 w-5" />
              Mint Free NFT
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
