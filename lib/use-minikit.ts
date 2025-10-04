/**
 * React hook for MiniKit integration
 * Based on the official Worldcoin MiniKit JS template
 */

import { useState, useEffect } from 'react'
import { minikitService, type MiniKitState } from './minikit'

export function useMiniKit() {
  const [state, setState] = useState<MiniKitState>(minikitService.getState())

  useEffect(() => {
    const unsubscribe = minikitService.subscribe(setState)
    return unsubscribe
  }, [])

  const initialize = async () => {
    await minikitService.initialize()
  }

  const connectWallet = async () => {
    return await minikitService.connectWallet()
  }

  const sendTransaction = async (transaction: {
    to: string
    value: string
    data?: string
  }) => {
    return await minikitService.sendTransaction(transaction)
  }

  const verifyIdentity = async (action: string, signal?: string) => {
    return await minikitService.verifyIdentity(action, signal)
  }

  const disconnect = () => {
    minikitService.disconnect()
  }

  return {
    ...state,
    initialize,
    connectWallet,
    sendTransaction,
    verifyIdentity,
    disconnect
  }
}



