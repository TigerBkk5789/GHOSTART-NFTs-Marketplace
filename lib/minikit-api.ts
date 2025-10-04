// World ID MiniKit API Integration
// Documentation: https://developer.worldcoin.org/api/v2/minikit

interface MiniKitTransactionResponse {
  transaction_id: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
  updated_at: string
  // Add other fields as needed based on API response
}

interface MiniKitAPIError {
  error: string
  message: string
  status_code: number
}

// MiniKit Error Codes based on official documentation
export const MINIKIT_ERROR_CODES = {
  // Verify command errors
  VERIFY: {
    VERIFICATION_REJECTED: 'verification_rejected',
    MAX_VERIFICATIONS_REACHED: 'max_verifications_reached',
    CREDENTIAL_UNAVAILABLE: 'credential_unavailable',
    MALFORMED_REQUEST: 'malformed_request',
    INVALID_NETWORK: 'invalid_network',
    INCLUSION_PROOF_FAILED: 'inclusion_proof_failed',
    INCLUSION_PROOF_PENDING: 'inclusion_proof_pending',
    UNEXPECTED_RESPONSE: 'unexpected_response',
    GENERIC_ERROR: 'generic_error'
  },
  
  // Pay command errors
  PAY: {
    INPUT_ERROR: 'input_error',
    PAYMENT_REJECTED: 'payment_rejected',
    INVALID_RECEIVER: 'invalid_receiver',
    INSUFFICIENT_BALANCE: 'insufficient_balance',
    TRANSACTION_FAILED: 'transaction_failed',
    GENERIC_ERROR: 'generic_error'
  },
  
  // Wallet Auth errors
  WALLET_AUTH: {
    MALFORMED_REQUEST: 'malformed_request',
    USER_REJECTED: 'user_rejected',
    GENERIC_ERROR: 'generic_error'
  },
  
  // Transaction errors
  TRANSACTION: {
    INVALID_OPERATION: 'invalid_operation',
    INVALID_CONTRACT: 'invalid_contract',
    USER_REJECTED: 'user_rejected',
    INPUT_ERROR: 'input_error',
    SIMULATION_FAILED: 'simulation_failed',
    TRANSACTION_FAILED: 'transaction_failed',
    GENERIC_ERROR: 'generic_error',
    DAILY_TX_LIMIT_REACHED: 'daily_tx_limit_reached',
    DISALLOWED_OPERATION: 'disallowed_operation',
    PERMITTED_AMOUNT_EXCEEDS_SLIPPAGE: 'permitted_amount_exceeds_slippage',
    PERMITTED_AMOUNT_NOT_FOUND: 'permitted_amount_not_found'
  }
} as const

// Error handling utilities
export class MiniKitErrorHandler {
  static getErrorMessage(errorCode: string, command: 'verify' | 'pay' | 'walletAuth' | 'transaction'): string {
    const errorMessages = {
      verify: {
        [MINIKIT_ERROR_CODES.VERIFY.VERIFICATION_REJECTED]: 'Verification was rejected. Please try again.',
        [MINIKIT_ERROR_CODES.VERIFY.MAX_VERIFICATIONS_REACHED]: 'Maximum verifications reached for this action.',
        [MINIKIT_ERROR_CODES.VERIFY.CREDENTIAL_UNAVAILABLE]: 'Credential not available. Please verify at the Orb or with your device.',
        [MINIKIT_ERROR_CODES.VERIFY.MALFORMED_REQUEST]: 'Invalid request format. Please contact support.',
        [MINIKIT_ERROR_CODES.VERIFY.INVALID_NETWORK]: 'Network mismatch. Please ensure you\'re using the correct environment.',
        [MINIKIT_ERROR_CODES.VERIFY.INCLUSION_PROOF_FAILED]: 'Verification failed. Please try again.',
        [MINIKIT_ERROR_CODES.VERIFY.INCLUSION_PROOF_PENDING]: 'Verification pending. Please try again in about an hour.',
        [MINIKIT_ERROR_CODES.VERIFY.UNEXPECTED_RESPONSE]: 'Unexpected error occurred. Please try again.',
        [MINIKIT_ERROR_CODES.VERIFY.GENERIC_ERROR]: 'An error occurred. Please try again.'
      },
      pay: {
        [MINIKIT_ERROR_CODES.PAY.INPUT_ERROR]: 'Invalid payment request. Please try again.',
        [MINIKIT_ERROR_CODES.PAY.PAYMENT_REJECTED]: 'Payment was cancelled. Please try again.',
        [MINIKIT_ERROR_CODES.PAY.INVALID_RECEIVER]: 'Invalid receiver address. Please contact support.',
        [MINIKIT_ERROR_CODES.PAY.INSUFFICIENT_BALANCE]: 'Insufficient balance. Please add more funds to your wallet.',
        [MINIKIT_ERROR_CODES.PAY.TRANSACTION_FAILED]: 'Transaction failed. Please try again.',
        [MINIKIT_ERROR_CODES.PAY.GENERIC_ERROR]: 'Payment error occurred. Please try again.'
      },
      walletAuth: {
        [MINIKIT_ERROR_CODES.WALLET_AUTH.MALFORMED_REQUEST]: 'Invalid request. Please try again.',
        [MINIKIT_ERROR_CODES.WALLET_AUTH.USER_REJECTED]: 'Wallet connection was rejected. Please try again.',
        [MINIKIT_ERROR_CODES.WALLET_AUTH.GENERIC_ERROR]: 'Connection error occurred. Please try again.'
      },
      transaction: {
        [MINIKIT_ERROR_CODES.TRANSACTION.INVALID_OPERATION]: 'Invalid operation. Please contact support.',
        [MINIKIT_ERROR_CODES.TRANSACTION.INVALID_CONTRACT]: 'Contract not whitelisted. Please contact support.',
        [MINIKIT_ERROR_CODES.TRANSACTION.USER_REJECTED]: 'Transaction was rejected. Please try again.',
        [MINIKIT_ERROR_CODES.TRANSACTION.INPUT_ERROR]: 'Invalid transaction data. Please try again.',
        [MINIKIT_ERROR_CODES.TRANSACTION.SIMULATION_FAILED]: 'Transaction simulation failed. Please check your balance.',
        [MINIKIT_ERROR_CODES.TRANSACTION.TRANSACTION_FAILED]: 'Transaction failed. Please try again later.',
        [MINIKIT_ERROR_CODES.TRANSACTION.GENERIC_ERROR]: 'Transaction error occurred. Please try again.',
        [MINIKIT_ERROR_CODES.TRANSACTION.DAILY_TX_LIMIT_REACHED]: 'Daily transaction limit reached. Please try again tomorrow.',
        [MINIKIT_ERROR_CODES.TRANSACTION.DISALLOWED_OPERATION]: 'Operation not allowed. Please contact support.',
        [MINIKIT_ERROR_CODES.TRANSACTION.PERMITTED_AMOUNT_EXCEEDS_SLIPPAGE]: 'Amount exceeds slippage tolerance.',
        [MINIKIT_ERROR_CODES.TRANSACTION.PERMITTED_AMOUNT_NOT_FOUND]: 'Permitted amount not found in transaction.'
      }
    }

    return (errorMessages[command] as any)[errorCode] || 'An unexpected error occurred. Please try again.'
  }

  static isRetryableError(errorCode: string, command: 'verify' | 'pay' | 'walletAuth' | 'transaction'): boolean {
    const retryableErrors = {
      verify: [
        MINIKIT_ERROR_CODES.VERIFY.VERIFICATION_REJECTED,
        MINIKIT_ERROR_CODES.VERIFY.INCLUSION_PROOF_FAILED,
        MINIKIT_ERROR_CODES.VERIFY.UNEXPECTED_RESPONSE,
        MINIKIT_ERROR_CODES.VERIFY.GENERIC_ERROR
      ],
      pay: [
        MINIKIT_ERROR_CODES.PAY.PAYMENT_REJECTED,
        MINIKIT_ERROR_CODES.PAY.TRANSACTION_FAILED,
        MINIKIT_ERROR_CODES.PAY.GENERIC_ERROR
      ],
      walletAuth: [
        MINIKIT_ERROR_CODES.WALLET_AUTH.USER_REJECTED,
        MINIKIT_ERROR_CODES.WALLET_AUTH.GENERIC_ERROR
      ],
      transaction: [
        MINIKIT_ERROR_CODES.TRANSACTION.USER_REJECTED,
        MINIKIT_ERROR_CODES.TRANSACTION.SIMULATION_FAILED,
        MINIKIT_ERROR_CODES.TRANSACTION.TRANSACTION_FAILED,
        MINIKIT_ERROR_CODES.TRANSACTION.GENERIC_ERROR
      ]
    }

    return (retryableErrors[command] as any).includes(errorCode)
  }

  static shouldShowUserMessage(errorCode: string, command: 'verify' | 'pay' | 'walletAuth' | 'transaction'): boolean {
    // Some errors should be shown to users, others should be logged internally
    const userVisibleErrors = {
      verify: [
        MINIKIT_ERROR_CODES.VERIFY.VERIFICATION_REJECTED,
        MINIKIT_ERROR_CODES.VERIFY.MAX_VERIFICATIONS_REACHED,
        MINIKIT_ERROR_CODES.VERIFY.CREDENTIAL_UNAVAILABLE,
        MINIKIT_ERROR_CODES.VERIFY.INCLUSION_PROOF_PENDING
      ],
      pay: [
        MINIKIT_ERROR_CODES.PAY.PAYMENT_REJECTED,
        MINIKIT_ERROR_CODES.PAY.INSUFFICIENT_BALANCE,
        MINIKIT_ERROR_CODES.PAY.TRANSACTION_FAILED
      ],
      walletAuth: [
        MINIKIT_ERROR_CODES.WALLET_AUTH.USER_REJECTED
      ],
      transaction: [
        MINIKIT_ERROR_CODES.TRANSACTION.USER_REJECTED,
        MINIKIT_ERROR_CODES.TRANSACTION.INSUFFICIENT_BALANCE,
        MINIKIT_ERROR_CODES.TRANSACTION.DAILY_TX_LIMIT_REACHED
      ]
    }

    return (userVisibleErrors[command] as any).includes(errorCode)
  }
}

interface CreateActionRequest {
  action: string
  name: string
  description: string
  max_verifications: number
}

interface CreateActionResponse {
  action_id: string
  action: string
  name: string
  description: string
  max_verifications: number
  created_at: string
  app_id: string
}

interface SendNotificationRequest {
  app_id: string
  wallet_addresses: string[]
  title: string
  message: string
  mini_app_path?: string
}

interface SendNotificationResponse {
  notification_id: string
  status: 'sent' | 'failed'
  sent_count: number
  failed_count: number
  created_at: string
}

interface VerifyRequest {
  nullifier_hash: string
  merkle_root: string
  proof: string
  verification_level: 'orb' | 'device'
  action: string
  signal_hash?: string
  max_age?: number
}

interface VerifyResponse {
  verified: boolean
  nullifier_hash: string
  merkle_root: string
  verification_level: string
  action: string
  signal_hash?: string
  timestamp: string
}

interface UserGrantCycleResponse {
  cycle_id: string
  user_id: string
  status: 'active' | 'completed' | 'expired'
  start_date: string
  end_date: string
  grants_used: number
  max_grants: number
  remaining_grants: number
  created_at: string
  updated_at: string
}

interface DebugTransactionResponse {
  debug_info: {
    transaction_id: string
    status: string
    details: any
    logs: string[]
  }
}

interface WorldServiceStatus {
  name: string
  id: string
  description: string
  categoryId: string
  status: 'ok' | 'warning' | 'error'
  logs?: Array<{
    datetime: number
    status: string
    name: string
    description: string
    downtime?: number
  }>
  uptimeRatio: {
    1: number
    7: number
    30: number
    90: number
  }
}

interface WorldStatusResponse {
  services: WorldServiceStatus[]
  categories: Array<{
    id: string
    name: string
    status: string
  }>
  uptimeRatio: {
    1: number
    7: number
    30: number
    90: number
  }
  status: 'ok' | 'warning' | 'error'
}

interface WorldUser {
  username: string
  profile_picture_url?: string
  address: string
}

interface ApplePayRequest {
  merchantIdentifier: string
  countryCode: string
  currencyCode: string
  supportedNetworks: string[]
  merchantCapabilities: string[]
  total: {
    label: string
    amount: string
  }
  lineItems?: Array<{
    label: string
    amount: string
  }>
}

interface GooglePayRequest {
  apiVersion: number
  apiVersionMinor: number
  allowedPaymentMethods: Array<{
    type: string
    parameters: {
      allowedAuthMethods: string[]
      allowedCardNetworks: string[]
    }
    tokenizationSpecification: {
      type: string
      parameters: {
        gateway: string
        gatewayMerchantId: string
      }
    }
  }>
  transactionInfo: {
    totalPriceStatus: string
    totalPrice: string
    currencyCode: string
  }
  merchantInfo: {
    merchantId: string
    merchantName: string
  }
}

interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  paymentMethod: 'apple_pay' | 'google_pay' | 'world_pay'
}

export class MiniKitAPI {
  private apiKey: string
  private baseURL = 'https://developer.worldcoin.org/api/v2'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Get transaction details by transaction ID
   * @param transactionId - The transaction ID to look up
   * @returns Promise<MiniKitTransactionResponse>
   */
  async getTransaction(transactionId: string): Promise<MiniKitTransactionResponse> {
    const response = await fetch(`${this.baseURL}/minikit/transaction/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    return response.json()
  }

  /**
   * Verify World ID proof using the official verification endpoint
   * @param appId - The app ID to verify against
   * @param verifyData - The verification data
   * @returns Promise<VerifyResponse>
   */
  async verifyWorldID(
    appId: string,
    verifyData: VerifyRequest
  ): Promise<VerifyResponse> {
    const response = await fetch(`${this.baseURL}/verify/${appId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verifyData),
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    return response.json()
  }

  /**
   * Get user's transaction history
   * @param userId - The user ID to get transactions for
   * @param limit - Number of transactions to return (default: 10)
   * @param offset - Number of transactions to skip (default: 0)
   * @returns Promise<MiniKitTransactionResponse[]>
   */
  async getUserTransactions(
    userId: string, 
    limit: number = 10, 
    offset: number = 0
  ): Promise<MiniKitTransactionResponse[]> {
    const params = new URLSearchParams({
      user_id: userId,
      limit: limit.toString(),
      offset: offset.toString(),
    })

    const response = await fetch(`${this.baseURL}/minikit/transactions?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    return response.json()
  }

  /**
   * Verify a World ID proof
   * @param proof - The World ID proof to verify
   * @param action - The action ID used for verification
   * @param signal - The signal used for verification
   * @returns Promise<boolean>
   */
  async verifyProof(
    proof: string,
    action: string,
    signal?: string
  ): Promise<boolean> {
    const response = await fetch(`${this.baseURL}/minikit/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        proof,
        action,
        signal,
      }),
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    const result = await response.json()
    return result.verified === true
  }

  /**
   * Create a new action for World ID verification
   * @param appId - The app ID to create the action for
   * @param actionData - The action data
   * @returns Promise<CreateActionResponse>
   */
  async createAction(
    appId: string,
    actionData: CreateActionRequest
  ): Promise<CreateActionResponse> {
    const response = await fetch(`${this.baseURL}/create-action/${appId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(actionData),
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    return response.json()
  }

  /**
   * Send notification to users via MiniKit
   * @param notificationData - The notification data
   * @returns Promise<SendNotificationResponse>
   */
  async sendNotification(
    notificationData: SendNotificationRequest
  ): Promise<SendNotificationResponse> {
    const response = await fetch(`${this.baseURL}/minikit/send-notification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    return response.json()
  }

  /**
   * Get user grant cycle information
   * @returns Promise<UserGrantCycleResponse>
   */
  async getUserGrantCycle(): Promise<UserGrantCycleResponse> {
    const response = await fetch(`${this.baseURL}/minikit/user-grant-cycle`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    return response.json()
  }

  /**
   * Get debug transaction information
   * @returns Promise<DebugTransactionResponse>
   */
  async getDebugTransaction(): Promise<DebugTransactionResponse> {
    const response = await fetch(`${this.baseURL}/minikit/transaction/debug`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: MiniKitAPIError = await response.json()
      throw new Error(`MiniKit API Error: ${error.message} (${error.status_code})`)
    }

    return response.json()
  }

  /**
   * Get World services status
   * @param includeLogs - Whether to include historical logs
   * @returns Promise<WorldStatusResponse>
   */
  async getWorldStatus(includeLogs: boolean = false): Promise<WorldStatusResponse> {
    const url = `https://status.worldcoin.org/api/services${includeLogs ? '?logs=true' : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`World Status API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Check if a user is verified using the Address Book contract
   * @param walletAddress - The wallet address to check
   * @param rpcUrl - Optional custom RPC URL
   * @returns Promise<boolean>
   */
  async isUserVerified(walletAddress: string, rpcUrl?: string): Promise<boolean> {
    try {
      // This would typically use the @worldcoin/minikit-js getIsUserVerified function
      // For now, we'll implement a basic check
      const response = await fetch('/api/check-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          rpcUrl: rpcUrl || 'https://worldchain-mainnet.g.alchemy.com/public'
        }),
      })

      if (!response.ok) {
        throw new Error('Verification check failed')
      }

      const result = await response.json()
      return result.verified === true
    } catch (error) {
      console.error('Error checking user verification:', error)
      return false
    }
  }

  /**
   * Get user information by wallet address
   * @param walletAddress - The wallet address to look up
   * @returns Promise<WorldUser | null>
   */
  async getUserByAddress(walletAddress: string): Promise<WorldUser | null> {
    try {
      // This would typically use MiniKit.getUserByAddress
      // For now, we'll implement a basic lookup
      const response = await fetch('/api/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      })

      if (!response.ok) {
        return null
      }

      return response.json()
    } catch (error) {
      console.error('Error getting user by address:', error)
      return null
    }
  }
}

// Example usage:
export const minikitAPI = new MiniKitAPI(process.env.NEXT_PUBLIC_MINI_APP_API_KEY || '')

// Helper function to get transaction status
export async function getTransactionStatus(transactionId: string): Promise<string> {
  try {
    const transaction = await minikitAPI.getTransaction(transactionId)
    return transaction.status
  } catch (error) {
    console.error('Error fetching transaction status:', error)
    return 'unknown'
  }
}

// Helper function to check if transaction is completed
export async function isTransactionCompleted(transactionId: string): Promise<boolean> {
  try {
    const transaction = await minikitAPI.getTransaction(transactionId)
    return transaction.status === 'completed'
  } catch (error) {
    console.error('Error checking transaction completion:', error)
    return false
  }
}

// Helper function to send notification to a single user
export async function sendUserNotification(
  walletAddress: string,
  title: string,
  message: string,
  miniAppPath?: string
): Promise<SendNotificationResponse> {
  const appId = process.env.NEXT_PUBLIC_APP_ID || 'app_cc2463e69dbce149c2073d4ca593af75'
  
  return minikitAPI.sendNotification({
    app_id: appId,
    wallet_addresses: [walletAddress],
    title,
    message,
    mini_app_path: miniAppPath,
  })
}

// Helper function to send notification to multiple users
export async function sendBulkNotification(
  walletAddresses: string[],
  title: string,
  message: string,
  miniAppPath?: string
): Promise<SendNotificationResponse> {
  const appId = process.env.NEXT_PUBLIC_APP_ID || 'app_cc2463e69dbce149c2073d4ca593af75'
  
  return minikitAPI.sendNotification({
    app_id: appId,
    wallet_addresses: walletAddresses,
    title,
    message,
    mini_app_path: miniAppPath,
  })
}

// Predefined notification templates for GHOSTART
export const GHOSTART_NOTIFICATIONS = {
  // NFT Claim notifications
  nftClaimSuccess: (username: string) => ({
    title: "🎉 NFT Claimed Successfully!",
    message: `Hello ${username}, your free GHOSTART NFT has been claimed! Check your wallet to see your new NFT.`,
    path: "/claim"
  }),
  
  nftClaimReminder: (username: string) => ({
    title: "🎁 Free NFT Still Available",
    message: `Hello ${username}, don't forget to claim your free GHOSTART NFT! Limited supply remaining.`,
    path: "/claim"
  }),

  // Trading notifications
  tradeSuccess: (username: string, amount: string, token: string) => ({
    title: "💰 Trade Completed",
    message: `Hello ${username}, your trade of ${amount} ${token} has been completed successfully!`,
    path: "/swap"
  }),

  priceAlert: (username: string, newPrice: string) => ({
    title: "📈 Price Update",
    message: `Hello ${username}, GHOSTART price has updated to ${newPrice}. Check the latest market data!`,
    path: "/swap"
  }),

  // Tip notifications
  tipReceived: (username: string, amount: string, token: string) => ({
    title: "💝 Tip Received!",
    message: `Hello ${username}, thank you for the ${amount} ${token} tip! Your support helps us build amazing features.`,
    path: "/tip"
  }),

  // Verification notifications
  verificationComplete: (username: string) => ({
    title: "✅ Verification Complete",
    message: `Hello ${username}, your World ID verification is complete! You now have access to all GHOSTART features.`,
    path: "/verify"
  }),

  // General updates
  newFeature: (username: string, feature: string) => ({
    title: "🚀 New Feature Available",
    message: `Hello ${username}, we've added ${feature} to GHOSTART! Check it out now.`,
    path: "/"
  }),

  maintenanceNotice: (username: string) => ({
    title: "🔧 Scheduled Maintenance",
    message: `Hello ${username}, GHOSTART will undergo maintenance soon. We'll notify you when it's complete.`,
    path: "/"
  })
}

// Payment method utilities
export class PaymentMethods {
  /**
   * Check if Apple Pay is available
   * @returns boolean
   */
  static isApplePayAvailable(): boolean {
    if (typeof window === 'undefined') return false
    return !!(window as any).ApplePaySession && (window as any).ApplePaySession.canMakePayments()
  }

  /**
   * Check if Google Pay is available
   * @returns boolean
   */
  static isGooglePayAvailable(): boolean {
    if (typeof window === 'undefined') return false
    return !!(window as any).google && !!(window as any).google.payments
  }

  /**
   * Initialize Apple Pay payment
   * @param request - Apple Pay request configuration
   * @returns Promise<PaymentResult>
   */
  static async initializeApplePay(request: ApplePayRequest): Promise<PaymentResult> {
    if (!this.isApplePayAvailable()) {
      return {
        success: false,
        error: 'Apple Pay is not available on this device',
        paymentMethod: 'apple_pay'
      }
    }

    try {
      const session = new (window as any).ApplePaySession(3, request)
      
      return new Promise((resolve) => {
        session.onvalidatemerchant = async (event: any) => {
          try {
            // Validate merchant with your server
            const response = await fetch('/api/validate-merchant', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ validationURL: event.validationURL })
            })
            const merchantSession = await response.json()
            session.completeMerchantValidation(merchantSession)
          } catch (error) {
            session.abort()
            resolve({
              success: false,
              error: 'Merchant validation failed',
              paymentMethod: 'apple_pay'
            })
          }
        }

        session.onpaymentauthorized = (event: any) => {
          // Process payment with your server
          fetch('/api/process-apple-pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment: event.payment })
          }).then(response => response.json())
            .then(result => {
              if (result.success) {
                session.completePayment((window as any).ApplePaySession.STATUS_SUCCESS)
                resolve({
                  success: true,
                  transactionId: result.transactionId,
                  paymentMethod: 'apple_pay'
                })
              } else {
                session.completePayment((window as any).ApplePaySession.STATUS_FAILURE)
                resolve({
                  success: false,
                  error: result.error,
                  paymentMethod: 'apple_pay'
                })
              }
            })
        }

        session.oncancel = () => {
          resolve({
            success: false,
            error: 'Payment cancelled by user',
            paymentMethod: 'apple_pay'
          })
        }

        session.begin()
      })
    } catch (error) {
      return {
        success: false,
        error: 'Apple Pay initialization failed',
        paymentMethod: 'apple_pay'
      }
    }
  }

  /**
   * Initialize Google Pay payment
   * @param request - Google Pay request configuration
   * @returns Promise<PaymentResult>
   */
  static async initializeGooglePay(request: GooglePayRequest): Promise<PaymentResult> {
    if (!this.isGooglePayAvailable()) {
      return {
        success: false,
        error: 'Google Pay is not available on this device',
        paymentMethod: 'google_pay'
      }
    }

    try {
      const paymentsClient = new (window as any).google.payments.api.PaymentsClient({
        environment: 'TEST' // Change to 'PRODUCTION' for live environment
      })

      const paymentDataRequest = {
        ...request,
        callbackIntents: ['PAYMENT_AUTHORIZATION']
      }

      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest)
      
      // Process payment with your server
      const response = await fetch('/api/process-google-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentData })
      })

      const result = await response.json()
      
      if (result.success) {
        return {
          success: true,
          transactionId: result.transactionId,
          paymentMethod: 'google_pay'
        }
      } else {
        return {
          success: false,
          error: result.error,
          paymentMethod: 'google_pay'
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Google Pay initialization failed',
        paymentMethod: 'google_pay'
      }
    }
  }
}

// World services monitoring
export class WorldServicesMonitor {
  /**
   * Get current status of all World services
   * @param includeLogs - Whether to include historical logs
   * @returns Promise<WorldStatusResponse>
   */
  static async getStatus(includeLogs: boolean = false): Promise<WorldStatusResponse> {
    return minikitAPI.getWorldStatus(includeLogs)
  }

  /**
   * Check if specific service is operational
   * @param serviceId - The service ID to check
   * @returns Promise<boolean>
   */
  static async isServiceOperational(serviceId: string): Promise<boolean> {
    try {
      const status = await this.getStatus()
      const service = status.services.find(s => s.id === serviceId)
      return service?.status === 'ok'
    } catch (error) {
      console.error('Error checking service status:', error)
      return false
    }
  }

  /**
   * Get uptime ratio for a specific service
   * @param serviceId - The service ID to check
   * @param period - Time period (1, 7, 30, or 90 days)
   * @returns Promise<number | null>
   */
  static async getServiceUptime(serviceId: string, period: 1 | 7 | 30 | 90 = 1): Promise<number | null> {
    try {
      const status = await this.getStatus()
      const service = status.services.find(s => s.id === serviceId)
      return service?.uptimeRatio[period] || null
    } catch (error) {
      console.error('Error getting service uptime:', error)
      return null
    }
  }
}

// User management utilities
export class UserManager {
  /**
   * Get user information with fallback to address
   * @param walletAddress - The wallet address
   * @returns Promise<{username: string, address: string, isVerified: boolean}>
   */
  static async getUserInfo(walletAddress: string): Promise<{
    username: string
    address: string
    isVerified: boolean
    profilePicture?: string
  }> {
    try {
      // Try to get user info from MiniKit
      const user = await minikitAPI.getUserByAddress(walletAddress)
      
      if (user) {
        return {
          username: user.username,
          address: walletAddress,
          isVerified: await minikitAPI.isUserVerified(walletAddress),
          profilePicture: user.profile_picture_url
        }
      }
      
      // Fallback to address if no username found
      return {
        username: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
        address: walletAddress,
        isVerified: await minikitAPI.isUserVerified(walletAddress)
      }
    } catch (error) {
      console.error('Error getting user info:', error)
      return {
        username: `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
        address: walletAddress,
        isVerified: false
      }
    }
  }

  /**
   * Send personalized notification to user
   * @param walletAddress - User's wallet address
   * @param notificationType - Type of notification to send
   * @param customData - Additional data for the notification
   */
  static async sendPersonalizedNotification(
    walletAddress: string,
    notificationType: keyof typeof GHOSTART_NOTIFICATIONS,
    customData?: any
  ) {
    try {
      const userInfo = await this.getUserInfo(walletAddress)
      const notification = GHOSTART_NOTIFICATIONS[notificationType](userInfo.username)
      
      // Add custom data if provided
      if (customData) {
        notification.message = notification.message.replace(/\$\{(\w+)\}/g, (match, key) => {
          return customData[key] || match
        })
      }

      await sendUserNotification(
        walletAddress,
        notification.title,
        notification.message,
        notification.path
      )
    } catch (error) {
      console.error('Error sending personalized notification:', error)
    }
  }
}
