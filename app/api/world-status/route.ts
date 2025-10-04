import { NextRequest, NextResponse } from 'next/server'
import { WorldServicesMonitor } from '@/lib/minikit-api'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const includeLogs = searchParams.get('logs') === 'true'
    
    const status = await WorldServicesMonitor.getStatus(includeLogs)
    
    return NextResponse.json({
      success: true,
      data: status
    })

  } catch (error) {
    console.error('World status error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch World services status' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { serviceId, period } = await req.json()
    
    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      )
    }

    const isOperational = await WorldServicesMonitor.isServiceOperational(serviceId)
    const uptime = period ? await WorldServicesMonitor.getServiceUptime(serviceId, period) : null
    
    return NextResponse.json({
      success: true,
      data: {
        serviceId,
        isOperational,
        uptime,
        period
      }
    })

  } catch (error) {
    console.error('Service status error:', error)
    return NextResponse.json(
      { error: 'Failed to check service status' },
      { status: 500 }
    )
  }
}


