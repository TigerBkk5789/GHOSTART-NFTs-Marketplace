import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift, Users, Calendar, CheckCircle2, Clock, Trophy, Zap } from "lucide-react"

const upcomingAirdrops = [
  {
    id: 1,
    title: "Early Adopter Airdrop",
    amount: "10,000 GHOSTART",
    date: "Coming Soon",
    status: "upcoming",
    description: "Reward for early platform users and NFT collectors",
    requirements: ["Hold at least 1 GHOSTART NFT", "Active wallet for 30+ days"],
  },
  {
    id: 2,
    title: "Trading Volume Rewards",
    amount: "50,000 GHOSTART",
    date: "TBA",
    status: "upcoming",
    description: "Distributed based on trading volume milestones",
    requirements: ["Complete 10+ trades", "Minimum $100 trading volume"],
  },
  {
    id: 3,
    title: "Community Champions",
    amount: "25,000 GHOSTART",
    date: "TBA",
    status: "upcoming",
    description: "For active community members and contributors",
    requirements: ["Join Discord community", "Participate in governance"],
  },
]

const rewardTiers = [
  {
    tier: "Bronze",
    icon: Trophy,
    minTokens: "100",
    benefits: ["Early access to drops", "5% trading fee discount"],
  },
  {
    tier: "Silver",
    icon: Trophy,
    minTokens: "1,000",
    benefits: ["Priority support", "10% trading fee discount", "Exclusive NFT drops"],
  },
  {
    tier: "Gold",
    icon: Trophy,
    minTokens: "10,000",
    benefits: ["VIP support", "20% trading fee discount", "Governance voting rights", "Beta feature access"],
  },
]

export default function RewardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Gift className="h-4 w-4" />
            Rewards Program
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
            Earn <span className="text-primary">GHOSTART</span> Rewards
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Get rewarded for being an active member of the GHOSTART community. Participate in airdrops, earn tokens, and
            unlock exclusive benefits.
          </p>
          <Button size="lg" className="gap-2 h-14 text-base bg-primary hover:bg-primary/90">
            <Zap className="h-5 w-5" />
            Check Eligibility
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">100K+</p>
            <p className="text-sm text-muted-foreground">Total Tokens to Distribute</p>
          </Card>

          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">5,000+</p>
            <p className="text-sm text-muted-foreground">Eligible Participants</p>
          </Card>

          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <p className="text-3xl font-bold mb-1">3</p>
            <p className="text-sm text-muted-foreground">Upcoming Airdrops</p>
          </Card>
        </div>

        {/* Upcoming Airdrops */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Airdrops</h2>
          <div className="grid gap-6">
            {upcomingAirdrops.map((airdrop) => (
              <Card key={airdrop.id} className="p-6 border-border/40 bg-card/50 backdrop-blur">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">{airdrop.title}</h3>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <Clock className="h-3 w-3" />
                        {airdrop.date}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{airdrop.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Requirements:</p>
                      {airdrop.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <p className="text-sm text-muted-foreground mb-1">Reward Pool</p>
                    <p className="text-3xl font-bold text-primary mb-4">{airdrop.amount}</p>
                    <Button className="w-full lg:w-auto bg-primary hover:bg-primary/90">Get Notified</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Reward Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rewardTiers.map((tier, index) => (
              <Card
                key={index}
                className={`p-6 border-border/40 bg-card/50 backdrop-blur ${index === 2 ? "border-2 border-primary/50 shadow-lg shadow-primary/20" : ""}`}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <tier.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                  <p className="text-sm text-muted-foreground">Hold {tier.minTokens}+ GHOSTART</p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Benefits:</p>
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="p-8 border-border/40 bg-card/50 backdrop-blur mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Connect Wallet</h3>
              <p className="text-sm text-muted-foreground">Link your World Chain wallet to the platform</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Meet Requirements</h3>
              <p className="text-sm text-muted-foreground">Complete tasks and meet eligibility criteria</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Wait for Airdrop</h3>
              <p className="text-sm text-muted-foreground">Get notified when airdrops are distributed</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl font-bold mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Claim Rewards</h3>
              <p className="text-sm text-muted-foreground">Receive GHOSTART tokens directly to your wallet</p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your wallet now to check your eligibility for upcoming GHOSTART airdrops and start earning rewards.
          </p>
          <Button size="lg" className="gap-2 h-14 text-base bg-primary hover:bg-primary/90">
            Connect Wallet
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
