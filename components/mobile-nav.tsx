"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/i18n"

interface MobileNavProps {
  locale: Locale
}

export function MobileNav({ locale }: MobileNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: `/${locale}`,
      label: "Home",
      icon: Home,
    },
    {
      href: `/${locale}/verify`,
      label: "Verify",
      icon: Shield,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
