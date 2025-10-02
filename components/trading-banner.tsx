import { ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TradingBanner() {
  return (
    <div className="relative overflow-hidden border-b border-border/50">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-pulse" />

      <div className="relative container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold text-foreground">
                <span className="text-primary">$GHOSTART</span> Token Available for Early Trading Now!
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Trading on <span className="text-accent font-medium">PUF World Mini App</span> • Only{" "}
                <span className="text-primary font-bold">0.000009 $GHOSTART / 1 $WLD</span>
              </p>
            </div>
          </div>

          <Button
            asChild
            className="flex-shrink-0 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <a
              href="https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Trade Now on PUF
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
