"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, BellOff, CheckCircle2, XCircle } from "lucide-react"
import { MiniKit, Permission, type RequestPermissionPayload } from "@worldcoin/minikit-js"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"

interface NotificationPermissionProps {
  locale: Locale
}

export function NotificationPermission({ locale }: NotificationPermissionProps) {
  const t = getTranslations(locale)
  const [permission, setPermission] = useState<{
    granted: boolean
    canRequest: boolean
  }>({
    granted: false,
    canRequest: false,
  })
  const [loading, setLoading] = useState(false)
  const [requested, setRequested] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    checkMiniKit()
  }, [])

  const checkMiniKit = async () => {
    try {
      const installed = await MiniKit.isInstalled()
      setIsInstalled(installed)
      setPermission({
        granted: false,
        canRequest: installed
      })
    } catch (error) {
      console.error('Error checking MiniKit:', error)
    }
  }

  const requestPermission = async () => {
    if (!isInstalled) {
      console.error('MiniKit not installed')
      return
    }

    setLoading(true)
    try {
      const requestPermissionPayload: RequestPermissionPayload = {
        permission: Permission.Notifications,
      }

      const { finalPayload } = await MiniKit.commandsAsync.requestPermission(requestPermissionPayload)

      if (finalPayload.status === 'success') {
        setPermission({
          granted: true,
          canRequest: false
        })
        setRequested(true)
      } else {
        setPermission({
          granted: false,
          canRequest: true
        })
        setRequested(true)
      }
    } catch (error) {
      console.error('Error requesting permission:', error)
      setPermission({
        granted: false,
        canRequest: true
      })
    } finally {
      setLoading(false)
    }
  }

  if (permission.granted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-lg">{t.notifications.enabled}</CardTitle>
          <CardDescription>
            {t.notifications.enabledDescription}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (requested && !permission.granted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <BellOff className="h-6 w-6 text-yellow-600" />
          </div>
          <CardTitle className="text-lg">{t.notifications.denied}</CardTitle>
          <CardDescription>
            {t.notifications.deniedDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={checkMiniKit} 
            variant="outline" 
            className="w-full"
          >
            {t.notifications.checkAgain}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Bell className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle className="text-lg">{t.notifications.enableTitle}</CardTitle>
        <CardDescription>
          {t.notifications.enableDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• {t.notifications.benefit1}</p>
          <p>• {t.notifications.benefit2}</p>
          <p>• {t.notifications.benefit3}</p>
        </div>
        <Button 
          onClick={requestPermission} 
          disabled={loading || !permission.canRequest}
          className="w-full"
        >
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {t.notifications.requesting}
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" />
              {t.notifications.enable}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
