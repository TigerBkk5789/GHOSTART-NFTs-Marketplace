import Image from "next/image"

export function PartnershipBanner() {
  return (
    <section className="relative w-full border-b border-border/40 bg-background">
      <div className="container px-6 py-4">
        <div className="relative mx-auto max-w-5xl">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WLD%20x%20GHOSTART-PDAQ3wMHyE1Kp2eDAnhzfUYwsbOSi6.png"
            alt="World Chain x GHOSTART Partnership - NFTs Minting Free"
            width={1200}
            height={315}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  )
}
