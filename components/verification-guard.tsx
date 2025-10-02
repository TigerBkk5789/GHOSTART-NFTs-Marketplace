"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useVerification } from "@/contexts/verification-context"
import { Loader2 } from "lucide-react"

export function VerificationGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isVerified, isLoading } = useVerification()

  useEffect(() => {
    // Skip verification check for the verify page itself
    if (pathname === "/verify") {
      return
    }

    // Redirect to verify page if not verified
    if (!isLoading && !isVerified) {
      router.push("/verify")
    }
  }, [isVerified, isLoading, pathname, router])

  // Show loading state while checking verification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  // Show nothing while redirecting
  if (!isVerified && pathname !== "/verify") {
    return null
  }

  return <>{children}</>
}
