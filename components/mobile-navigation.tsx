'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Coins, ShoppingCart, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavigationProps {
  locale: string
}

export function MobileNavigation({ locale }: MobileNavigationProps) {
  const pathname = usePathname()
  
  const navItems = [
    {
      href: `/${locale}`,
      icon: Home,
      label: 'Home',
      active: pathname === `/${locale}` || pathname === `/${locale}/`
    },
    {
      href: `/${locale}/swap`,
      icon: Coins,
      label: 'Swap',
      active: pathname === `/${locale}/swap`
    },
    {
      href: `/${locale}/claim`,
      icon: ShoppingCart,
      label: 'Claim',
      active: pathname === `/${locale}/claim`
    },
    {
      href: `/${locale}/verify`,
      icon: User,
      label: 'Verify',
      active: pathname === `/${locale}/verify`
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 px-2 py-2 transition-colors",
                item.active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
