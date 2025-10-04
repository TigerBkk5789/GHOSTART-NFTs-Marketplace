"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Share2, Copy, CheckCircle2, Loader2, XCircle, Users, Gift, Coins } from "lucide-react"
import { MiniKit } from "@worldcoin/minikit-js"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"

interface ShareInviteProps {
  locale: Locale
  userId?: string
  className?: string
}

export function ShareInvite({ locale, userId, className = "" }: ShareInviteProps) {
  const t = getTranslations(locale)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inviteLink, setInviteLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [shareStats, setShareStats] = useState({
    totalInvites: 0,
    successfulReferrals: 0,
    totalRewards: 0
  })

  // Mock user ID - in real implementation, get from user context
  const currentUserId = userId || "user_" + Math.random().toString(36).substr(2, 9)

  useEffect(() => {
    const checkMiniKit = async () => {
      try {
        const installed = await MiniKit.isInstalled()
        setIsInstalled(installed)
      } catch (error) {
        console.error('Error checking MiniKit:', error)
      }
    }

    checkMiniKit()
    generateInviteLink()
    loadShareStats()
  }, [currentUserId])

  const generateInviteLink = () => {
    // Use the provided referral link format
    const baseUrl = "https://world.org/join"
    const referralCode = currentUserId.toUpperCase().substr(0, 8) // Generate 8-character code like QCBJI48
    
    const link = `${baseUrl}/${referralCode}`
    setInviteLink(link)
  }

  const loadShareStats = async () => {
    try {
      // Mock stats - in real implementation, fetch from API
      setShareStats({
        totalInvites: 12,
        successfulReferrals: 8,
        totalRewards: 800
      })
    } catch (error) {
      console.error('Error loading share stats:', error)
    }
  }

  const handleShare = async () => {
    if (!isInstalled) {
      setError("MiniKit not available. Please open this in World App.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await MiniKit.commandsAsync.share({
        title: "Join me on GHOSTART NFT Marketplace! 🎨",
        text: `I'm using GHOSTART to mint and trade NFTs on World Chain. Join me and we both get rewards! 🎁

🎁 You get: 50 GHOSTART tokens + 1 free NFT mint
🎁 I get: 100 GHOSTART tokens for referring you

Connect with World ID and start your NFT journey!

Join here: ${inviteLink}`,
        url: inviteLink,
      })

      // Track the share event
      console.log('Invite shared successfully:', {
        user_id: currentUserId,
        share_method: "native",
        invite_link: inviteLink
      })

      // Update stats
      setShareStats(prev => ({
        ...prev,
        totalInvites: prev.totalInvites + 1
      }))

    } catch (error) {
      console.error("Share failed:", error)
      setError("Failed to share invite. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      setError("Failed to copy link. Please try again.")
    }
  }

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Share2 className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle>Invite Friends & Earn</CardTitle>
        <CardDescription>
          Share GHOSTART with friends and both of you get rewards!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Share Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{shareStats.totalInvites}</div>
            <div className="text-xs text-muted-foreground">Invites Sent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{shareStats.successfulReferrals}</div>
            <div className="text-xs text-muted-foreground">Friends Joined</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{shareStats.totalRewards}</div>
            <div className="text-xs text-muted-foreground">Tokens Earned</div>
          </div>
        </div>

        {/* Rewards Info */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Referral Rewards:</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-green-50 dark:bg-green-950 rounded">
              <Gift className="h-4 w-4 text-green-500" />
              <span className="text-sm">Your friend gets 50 GHOSTART + 1 free NFT</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-950 rounded">
              <Coins className="h-4 w-4 text-blue-500" />
              <span className="text-sm">You get 100 GHOSTART per successful referral</span>
            </div>
          </div>
        </div>

        {/* Invite Link */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Invite Link:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-3 py-2 text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={copyInviteLink}
              className="flex items-center gap-1"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleShare}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sharing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share via World App</span>
              </div>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={copyInviteLink}
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="bg-red-100 border-red-400 text-red-800">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">💡 Pro Tips:</h4>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Share after completing your first NFT mint</li>
            <li>• Post in crypto communities and social media</li>
            <li>• Explain the World ID verification benefits</li>
            <li>• Highlight the free NFT minting feature</li>
          </ul>
        </div>

        {/* Terms */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t">
          <p>Rewards are credited after friend completes World ID verification</p>
          <p>Maximum 10 referrals per user • Terms apply</p>
        </div>
      </CardContent>
    </Card>
  )
}
