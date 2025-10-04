import { NextRequest, NextResponse } from 'next/server'
import { minikitAPI, MINIKIT_ERROR_CODES, MiniKitErrorHandler } from '@/lib/minikit-api'

export async function POST(req: NextRequest) {
  try {
    const { walletAddresses, title, message, miniAppPath, notificationType, customData } = await req.json()
    
    if (!walletAddresses || !Array.isArray(walletAddresses) || walletAddresses.length === 0) {
      return NextResponse.json(
        { error: 'Wallet addresses array is required' },
        { status: 400 }
      )
    }

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      )
    }

    const appId = process.env.NEXT_PUBLIC_APP_ID || 'app_cc2463e69dbce149c2073d4ca593af75'
    
    const notificationData = {
      app_id: appId,
      wallet_addresses: walletAddresses,
      title,
      message,
      mini_app_path: miniAppPath
    }

    try {
      const result = await minikitAPI.sendNotification(notificationData)
      
      return NextResponse.json({
        success: true,
        data: result
      })
    } catch (error: any) {
      // Handle MiniKit specific errors
      if (error.message.includes('MiniKit API Error')) {
        const errorCode = error.message.match(/error: (\w+)/)?.[1]
        
        if (errorCode && MiniKitErrorHandler.shouldShowUserMessage(errorCode, 'verify')) {
          return NextResponse.json({
            success: false,
            error: MiniKitErrorHandler.getErrorMessage(errorCode, 'verify'),
            retryable: MiniKitErrorHandler.isRetryableError(errorCode, 'verify')
          }, { status: 400 })
        }
      }
      
      throw error
    }

  } catch (error) {
    console.error('Send notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}


