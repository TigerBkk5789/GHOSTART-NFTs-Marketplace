"use client"

import { type ReactNode } from "react"

export function MiniKitProvider({ children }: { children: ReactNode }) {
  // MiniKit is automatically initialized when the app runs in World App
  // No manual initialization needed
  return <>{children}</>
}
