/**
 * MiniKit integration utilities
 * Based on the official Worldcoin MiniKit JS template
 */

import { MiniKit } from "@worldcoin/minikit-js"

export interface MiniKitState {
  isInstalled: boolean
  isConnected: boolean
  walletAddress: string | null
  isLoading: boolean
  error: string | null
}

export class MiniKitService {
  private static instance: MiniKitService
  private state: MiniKitState = {
    isInstalled: false,
    isConnected: false,
    walletAddress: null,
    isLoading: false,
    error: null
  }

  private listeners: ((state: MiniKitState) => void)[] = []

  private constructor() {}

  static getInstance(): MiniKitService {
    if (!MiniKitService.instance) {
      MiniKitService.instance = new MiniKitService()
    }
    return MiniKitService.instance
  }

  subscribe(listener: (state: MiniKitState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state))
  }

  private setState(updates: Partial<MiniKitState>) {
    this.state = { ...this.state, ...updates }
    this.notifyListeners()
  }

  async initialize(): Promise<void> {
    this.setState({ isLoading: true, error: null })

    try {
      // Check if MiniKit is available
      const isInstalled = await MiniKit.isInstalled()
      this.setState({ isInstalled })

      if (isInstalled) {
        // Install MiniKit
        await MiniKit.install()
        
        // Try to get wallet address
        try {
          // MiniKit doesn't have a direct getWalletAddress method
          // We'll set a mock address for now - in real usage, this would come from wallet auth
          const mockAddress = "0x1234567890abcdef1234567890abcdef12345678"
          this.setState({
            isConnected: true,
            walletAddress: mockAddress,
            isLoading: false
          })
        } catch (error) {
          // Wallet not connected, but MiniKit is available
          this.setState({
            isConnected: false,
            walletAddress: null,
            isLoading: false
          })
        }
      } else {
        this.setState({
          isInstalled: false,
          isConnected: false,
          walletAddress: null,
          isLoading: false,
          error: 'MiniKit not available. Please open in World App.'
        })
      }
    } catch (error) {
      console.error('MiniKit initialization error:', error)
      this.setState({
        isInstalled: false,
        isConnected: false,
        walletAddress: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize MiniKit'
      })
    }
  }

  async connectWallet(): Promise<string> {
    this.setState({ isLoading: true, error: null })

    try {
      if (!this.state.isInstalled) {
        throw new Error('MiniKit not installed')
      }

      // MiniKit doesn't have a direct getWalletAddress method
      // In a real implementation, this would come from wallet authentication
      const mockAddress = "0x1234567890abcdef1234567890abcdef12345678"
      this.setState({
        isConnected: true,
        walletAddress: mockAddress,
        isLoading: false
      })

      return mockAddress
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet'
      this.setState({
        isConnected: false,
        walletAddress: null,
        isLoading: false,
        error: errorMessage
      })
      throw error
    }
  }

  async sendTransaction(transaction: {
    to: string
    value: string
    data?: string
  }): Promise<{ hash: string }> {
    if (!this.state.isConnected || !this.state.walletAddress) {
      throw new Error('Wallet not connected')
    }

    this.setState({ isLoading: true, error: null })

    try {
      const result = await MiniKit.sendTransaction(transaction)
      this.setState({ isLoading: false })
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Transaction failed'
      this.setState({
        isLoading: false,
        error: errorMessage
      })
      throw error
    }
  }

  async verifyIdentity(action: string, signal?: string): Promise<{
    status: 'success'
    proof: string
    merkle_root: string
    nullifier_hash: string
    verification_level: string
    version: number
  }> {
    if (!this.state.isInstalled) {
      throw new Error('MiniKit not installed')
    }

    this.setState({ isLoading: true, error: null })

    try {
      const verifyPayload = {
        action,
        signal,
        verification_level: 'orb' as const
      }

      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)
      
      if (finalPayload.status === 'error') {
        throw new Error('Verification failed or was cancelled')
      }

      this.setState({ isLoading: false })
      return finalPayload
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Identity verification failed'
      this.setState({
        isLoading: false,
        error: errorMessage
      })
      throw error
    }
  }

  getState(): MiniKitState {
    return { ...this.state }
  }

  disconnect(): void {
    this.setState({
      isConnected: false,
      walletAddress: null,
      error: null
    })
  }
}

// Export singleton instance
export const minikitService = MiniKitService.getInstance()
