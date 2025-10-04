import { NextRequest, NextResponse } from 'next/server'
import { getIsUserVerified } from '@worldcoin/minikit-js'

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, rpcUrl } = await req.json()
    
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Use the official World ID Address Book contract to check verification
    const isVerified = await getIsUserVerified(
      walletAddress,
      rpcUrl || 'https://worldchain-mainnet.g.alchemy.com/public'
    )
    
    return NextResponse.json({
      success: true,
      verified: isVerified,
      address: walletAddress
    })

  } catch (error) {
    console.error('Verification check error:', error)
    return NextResponse.json(
      { error: 'Failed to check verification status' },
      { status: 500 }
    )
  }
}


