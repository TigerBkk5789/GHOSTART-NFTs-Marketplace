"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, Shield, User, ExternalLink } from "lucide-react"
import { UserManager } from "@/lib/minikit-api"

interface UserVerificationProps {
  walletAddress: string
  locale: string
}

export function UserVerification({ walletAddress, locale }: UserVerificationProps) {
  const [userInfo, setUserInfo] = useState<{
    username: string
    address: string
    isVerified: boolean
    profilePicture?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const info = await UserManager.getUserInfo(walletAddress)
        setUserInfo(info)
      } catch (err) {
        setError('Failed to fetch user information')
        console.error('User info fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (walletAddress) {
      fetchUserInfo()
    }
  }, [walletAddress])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!userInfo) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          User Verification
        </CardTitle>
        <CardDescription>
          World ID verification status and user information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 border rounded-lg">
          {userInfo.profilePicture ? (
            <img
              src={userInfo.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          
          <div className="flex-1">
            <h4 className="font-medium">{userInfo.username}</h4>
            <p className="text-sm text-muted-foreground font-mono">
              {userInfo.address}
            </p>
          </div>
          
          <div className="text-right">
            {userInfo.isVerified ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary">
                <XCircle className="h-3 w-3 mr-1" />
                Not Verified
              </Badge>
            )}
          </div>
        </div>

        {/* Verification Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">World ID Status</span>
            </div>
            <div className="text-sm">
              {userInfo.isVerified ? (
                <span className="text-green-600 font-medium">Orb Verified</span>
              ) : (
                <span className="text-muted-foreground">Not Verified</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Username</span>
            </div>
            <div className="text-sm font-mono">
              {userInfo.username}
            </div>
          </div>
        </div>

        {/* Actions */}
        {!userInfo.isVerified && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              This user is not verified with World ID. They can verify their identity to access additional features.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://worldscan.org/address/${userInfo.address}`, '_blank')}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </Button>
          
          {userInfo.isVerified && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://worldcoin.org/verify', '_blank')}
              className="flex-1"
            >
              <Shield className="h-4 w-4 mr-2" />
              Verify Others
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


