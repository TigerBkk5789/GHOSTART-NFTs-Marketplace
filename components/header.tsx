"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Menu, Wallet } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/swap", label: "Swap" },
    { href: "/mini-app", label: "Mini App" },
    { href: "/trade", label: "Trade" },
    { href: "/reward", label: "Reward" },
    { href: "/create", label: "Create" },
    { href: "/developers", label: "Developers" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/ghostart-logo.jpg" alt="GHOSTART" fill className="object-contain" priority />
            </div>
            <span className="text-xl font-bold">GHOSTART</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search collections..."
              className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-muted-foreground"
            />
          </div>

          <Button className="md:hidden flex items-center gap-2 bg-primary hover:bg-primary/90" size="sm">
            <Wallet className="h-4 w-4" />
            <span className="hidden xs:inline">Connect</span>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search collections..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
                  />
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Button className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  )
}
