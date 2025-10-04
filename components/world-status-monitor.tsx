"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock, Activity } from "lucide-react"
import { WorldServicesMonitor } from "@/lib/minikit-api"

interface ServiceStatus {
  name: string
  id: string
  status: 'ok' | 'warning' | 'error'
  uptimeRatio: {
    1: number
    7: number
    30: number
    90: number
  }
}

export function WorldStatusMonitor() {
  const [status, setStatus] = useState<ServiceStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStatus = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/world-status?logs=true')
      const result = await response.json()
      
      if (result.success) {
        setStatus(result.data.services)
        setLastUpdated(new Date())
      } else {
        setError('Failed to fetch status')
      }
    } catch (err) {
      setError('Error fetching World services status')
      console.error('Status fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return <Badge variant="default" className="bg-green-500">Operational</Badge>
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Degraded</Badge>
      case 'error':
        return <Badge variant="destructive">Outage</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(1)}%`
  }

  if (loading && status.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            World Services Status
          </CardTitle>
          <CardDescription>Loading service status...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              World Services Status
            </CardTitle>
            <CardDescription>
              {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStatus}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {status.length > 0 && (
          <div className="space-y-3">
            {status.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">ID: {service.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {formatUptime(service.uptimeRatio[1])} (24h)
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatUptime(service.uptimeRatio[7])} (7d)
                    </div>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>Monitor World services at <a href="https://status.worldcoin.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">status.worldcoin.org</a></p>
        </div>
      </CardContent>
    </Card>
  )
}


