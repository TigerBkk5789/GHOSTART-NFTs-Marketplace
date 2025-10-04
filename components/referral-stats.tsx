"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Gift, Coins, TrendingUp, Award, Target } from "lucide-react"
import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"

interface ReferralStatsProps {
  locale: Locale
}

interface StatsData {
  totalInvites: number
  successfulReferrals: number
  totalRewards: number
  conversionRate: number
  rank: string
  nextMilestone: number
  progressToNext: number
}

export function ReferralStats({ locale }: ReferralStatsProps) {
  const t = getTranslations(locale)
  const [stats, setStats] = useState<StatsData>({
    totalInvites: 0,
    successfulReferrals: 0,
    totalRewards: 0,
    conversionRate: 0,
    rank: "Beginner",
    nextMilestone: 5,
    progressToNext: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Mock data - in real implementation, fetch from API
      const mockStats: StatsData = {
        totalInvites: 12,
        successfulReferrals: 8,
        totalRewards: 800,
        conversionRate: 66.7,
        rank: "Expert",
        nextMilestone: 10,
        progressToNext: 80
      }
      
      setStats(mockStats)
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRankBadgeColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'beginner': return 'bg-gray-100 text-gray-800'
      case 'intermediate': return 'bg-blue-100 text-blue-800'
      case 'expert': return 'bg-purple-100 text-purple-800'
      case 'master': return 'bg-orange-100 text-orange-800'
      case 'legend': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRankIcon = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'beginner': return '🌱'
      case 'intermediate': return '📈'
      case 'expert': return '🎯'
      case 'master': return '👑'
      case 'legend': return '🏆'
      default: return '🌱'
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Referral Stats</CardTitle>
          <CardDescription>Loading your referral performance...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Referral Stats
            </CardTitle>
            <CardDescription>Track your referral performance and earnings</CardDescription>
          </div>
          <Badge className={`${getRankBadgeColor(stats.rank)} flex items-center gap-1`}>
            <span>{getRankIcon(stats.rank)}</span>
            {stats.rank}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.totalInvites}</div>
            <div className="text-xs text-blue-600">Invites Sent</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <Gift className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.successfulReferrals}</div>
            <div className="text-xs text-green-600">Friends Joined</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <Coins className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.totalRewards}</div>
            <div className="text-xs text-orange-600">Tokens Earned</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <Target className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</div>
            <div className="text-xs text-purple-600">Conversion Rate</div>
          </div>
        </div>

        {/* Progress to Next Milestone */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress to Next Milestone</span>
            <span className="text-sm text-muted-foreground">
              {stats.successfulReferrals}/{stats.nextMilestone} referrals
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.progressToNext}%` }}
            ></div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4" />
            <span>
              {stats.nextMilestone - stats.successfulReferrals} more referrals to reach next milestone
            </span>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {stats.successfulReferrals >= 1 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                🎉 First Referral
              </Badge>
            )}
            {stats.successfulReferrals >= 5 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                🚀 5 Referrals
              </Badge>
            )}
            {stats.successfulReferrals >= 10 && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                👑 10 Referrals
              </Badge>
            )}
            {stats.conversionRate >= 50 && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                🎯 High Converter
              </Badge>
            )}
            {stats.totalRewards >= 500 && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                💰 Top Earner
              </Badge>
            )}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Performance Insights</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            {stats.conversionRate >= 50 ? (
              <p>🎉 Excellent conversion rate! Keep up the great work!</p>
            ) : (
              <p>💡 Try sharing in crypto communities for better conversion rates</p>
            )}
            {stats.totalInvites > stats.successfulReferrals * 2 && (
              <p>📈 Consider following up with friends who haven't joined yet</p>
            )}
            {stats.successfulReferrals >= 5 && (
              <p>🏆 You're a referral champion! Share your success story</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


