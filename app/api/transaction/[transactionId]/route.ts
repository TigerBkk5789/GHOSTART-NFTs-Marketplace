import { NextRequest, NextResponse } from 'next/server'
import { minikitAPI } from '@/lib/minikit-api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  try {
    const { transactionId } = await params
    
    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      )
    }

    // Validate transaction ID format (basic validation)
    if (!/^[a-zA-Z0-9_-]+$/.test(transactionId)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID format' },
        { status: 400 }
      )
    }

    const transaction = await minikitAPI.getTransaction(transactionId)
    
    return NextResponse.json({
      success: true,
      data: transaction
    })

  } catch (error) {
    console.error('Transaction lookup error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        return NextResponse.json(
          { error: 'Transaction not found' },
          { status: 404 }
        )
      }
      
      if (error.message.includes('401')) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid API key' },
          { status: 401 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch transaction details' },
      { status: 500 }
    )
  }
}


