import { type NextRequest, NextResponse } from "next/server"

interface ISuccessResult {
  merkle_root: string
  nullifier_hash: string
  proof: string
  verification_level: string
}

interface VerifyPayload {
  payload: ISuccessResult
  action: string
  signal?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyPayload = await request.json()
    const { payload, action, signal } = body

    console.log("[v0] Verifying proof for action:", action)

    if (!payload) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 })
    }

    const app_id = process.env.APP_ID as `app_${string}`

    if (!app_id) {
      console.error("[v0] APP_ID environment variable not set")
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 })
    }

    const verifyResponse = await fetch(`https://developer.worldcoin.org/api/v2/verify/${app_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merkle_root: payload.merkle_root,
        nullifier_hash: payload.nullifier_hash,
        proof: payload.proof,
        verification_level: payload.verification_level,
        action: action,
        signal: signal || "",
      }),
    })

    const verifyData = await verifyResponse.json()

    console.log("[v0] World ID verification response:", verifyData)

    if (!verifyResponse.ok || !verifyData.success) {
      console.error("[v0] World ID verification failed:", verifyData)
      return NextResponse.json(
        {
          success: false,
          error: verifyData.detail || verifyData.code || "Verification failed",
          verifyRes: verifyData,
        },
        { status: 400 },
      )
    }

    // Verification successful
    return NextResponse.json({
      success: true,
      verifyRes: verifyData,
      nullifier_hash: payload.nullifier_hash,
      verification_level: payload.verification_level,
    })
  } catch (error) {
    console.error("[v0] Verification error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
