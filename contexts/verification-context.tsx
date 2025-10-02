"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface VerificationContextType {
  isVerified: boolean
  isLoading: boolean
  verify: () => void
  nullifierHash: string | null
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined)

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [nullifierHash, setNullifierHash] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is already verified (stored in localStorage)
    const verified = localStorage.getItem("ghostart_verified")
    const hash = localStorage.getItem("ghostart_nullifier_hash")

    if (verified === "true" && hash) {
      setIsVerified(true)
      setNullifierHash(hash)
    }
    setIsLoading(false)
  }, [])

  const verify = () => {
    // This will be called after successful verification
    setIsVerified(true)
  }

  return (
    <VerificationContext.Provider value={{ isVerified, isLoading, verify, nullifierHash }}>
      {children}
    </VerificationContext.Provider>
  )
}

export function useVerification() {
  const context = useContext(VerificationContext)
  if (context === undefined) {
    throw new Error("useVerification must be used within a VerificationProvider")
  }
  return context
}
