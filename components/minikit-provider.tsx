"use client"

import { type ReactNode, useEffect } from "react"
import { MiniKit } from "@worldcoin/minikit-js"

export function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // isInstalled() throws errors when not in World App, so we just try to install
    try {
      MiniKit.install()
    } catch (error) {
      // Silently fail if not in World App - this is expected behavior
    }
  }, [])

  return <>{children}</>
}
