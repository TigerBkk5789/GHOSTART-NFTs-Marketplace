"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Gift, Coffee, Star, Zap, Crown, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { MiniKit, type PayCommandInput, Tokens, tokenToDecimals } from "@worldcoin/minikit-js"
import { MINIKIT_ERROR_CODES, MiniKitErrorHandler, UserManager } from "@/lib/minikit-api"

interface TipFeatureProps {
  recipientAddress: string
  locale: string
}

export function TipFeature({ recipientAddress, locale }: TipFeatureProps) {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tipAmount, setTipAmount] = useState("")
  const [tipToken, setTipToken] = useState("WLD")
  const [tipMessage, setTipMessage] = useState("")
  const [selectedPreset, setSelectedPreset] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [tipSent, setTipSent] = useState(false)

  // Your wallet address for receiving tips
  const yourWalletAddress = recipientAddress

  useEffect(() => {
    const checkMiniKit = async () => {
      try {
        const installed = await MiniKit.isInstalled()
        setIsInstalled(installed)
        
        if (installed) {
          // Try to get existing wallet connection
          try {
            // MiniKit doesn't have a direct getWalletAddress method
            // We'll set a mock address for now - in real usage, this would come from wallet auth
            const mockAddress = "0x1234567890abcdef1234567890abcdef12345678"
            setWalletAddress(mockAddress)
            setIsConnected(true)
          } catch (error) {
            // Wallet not connected yet
          }
        }
      } catch (error) {
        console.error('Error checking MiniKit:', error)
      }
    }

    checkMiniKit()
  }, [])

  const tipPresets = [
    { amount: "1", label: "☕ Coffee", icon: Coffee },
    { amount: "5", label: "🍕 Pizza", icon: Heart },
    { amount: "10", label: "🎁 Gift", icon: Gift },
    { amount: "25", label: "⭐ Star", icon: Star },
    { amount: "50", label: "⚡ Power", icon: Zap },
    { amount: "100", label: "👑 King", icon: Crown }
  ]

  const handlePresetTip = (amount: string) => {
    setTipAmount(amount)
    setSelectedPreset(amount)
  }

  const handleSendTip = async () => {
    if (!tipAmount) return

    if (!isInstalled) {
      setError("MiniKit not available. Please open this in World App.")
      return
    }

    if (!isConnected) {
      setError("Please connect your wallet first")
      return
    }

    setIsProcessing(true)
    setError(null)
    
    try {
      // Create payment payload using MiniKit Pay command
      const payPayload: PayCommandInput = {
        reference: crypto.randomUUID().replace(/-/g, ''),
        to: yourWalletAddress,
        tokens: [
          {
            symbol: tipToken === "WLD" ? Tokens.WLD : Tokens.USDC,
            token_amount: tokenToDecimals(parseFloat(tipAmount), tipToken === "WLD" ? Tokens.WLD : Tokens.USDC).toString(),
          },
        ],
        description: `Tip for GHOSTART: ${getTipMessage()}`,
      }

          const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.pay(payPayload)

          if (finalPayload.status === 'error') {
            // Handle specific MiniKit error codes
            const errorCode = finalPayload.error_code || 'generic_error'
            const errorMessage = MiniKitErrorHandler.getErrorMessage(errorCode, 'pay')
            setError(errorMessage)
            setIsProcessing(false)
            return
          }

          setTipSent(true)
          
          // Send personalized notification to recipient
          try {
            await UserManager.sendPersonalizedNotification(
              yourWalletAddress,
              'tipReceived',
              { amount: tipAmount, token: tipToken }
            )
          } catch (notificationError) {
            console.error('Failed to send tip notification:', notificationError)
          }
          
          // Track tip sent
          console.log('Tip sent:', {
            amount: tipAmount,
            token: tipToken,
            message: tipMessage,
            from: walletAddress,
            to: yourWalletAddress,
            transactionId: finalPayload.transaction_id
          })
      
    } catch (error) {
      console.error('Error sending tip:', error)
      setError('Failed to send tip. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getTipMessage = () => {
    if (tipMessage) return tipMessage
    
    const preset = tipPresets.find(p => p.amount === selectedPreset)
    if (preset) {
      return `Thanks for the ${preset.label.toLowerCase()}! 🎉`
    }
    
    return "Thanks for supporting GHOSTART! 🚀"
  }

  if (tipSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Tip Sent! 🎉</CardTitle>
          <CardDescription>
            Thank you for supporting GHOSTART NFT Marketplace!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Your tip of {tipAmount} {tipToken} has been sent to the developer.
          </p>
          <Button 
            onClick={() => {
              setTipSent(false)
              setTipAmount("")
              setTipMessage("")
              setSelectedPreset("")
            }}
            variant="outline"
            className="w-full"
          >
            Send Another Tip
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-orange-600" />
        </div>
        <CardTitle>Support GHOSTART</CardTitle>
        <CardDescription>
          Love the marketplace? Send a tip to support development! 💝
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tip Presets */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Quick Tips</Label>
          <div className="grid grid-cols-2 gap-2">
            {tipPresets.map((preset) => {
              const IconComponent = preset.icon
              return (
                <Button
                  key={preset.amount}
                  variant={selectedPreset === preset.amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePresetTip(preset.amount)}
                  className="h-auto p-3 flex flex-col items-center space-y-1"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs">{preset.label}</span>
                  <span className="text-xs font-bold">{preset.amount} {tipToken}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <Label htmlFor="tipAmount">Custom Amount</Label>
          <div className="flex space-x-2">
            <Input
              id="tipAmount"
              type="number"
              placeholder="0"
              value={tipAmount}
              onChange={(e) => {
                setTipAmount(e.target.value)
                setSelectedPreset("")
              }}
              className="flex-1"
            />
            <div className="flex space-x-1">
              <Button
                variant={tipToken === "WLD" ? "default" : "outline"}
                size="sm"
                onClick={() => setTipToken("WLD")}
              >
                WLD
              </Button>
              <Button
                variant={tipToken === "USDC" ? "default" : "outline"}
                size="sm"
                onClick={() => setTipToken("USDC")}
              >
                USDC
              </Button>
            </div>
          </div>
        </div>

        {/* Tip Message */}
        <div>
          <Label htmlFor="tipMessage">Message (Optional)</Label>
          <Input
            id="tipMessage"
            placeholder="Leave a message for the developer..."
            value={tipMessage}
            onChange={(e) => setTipMessage(e.target.value)}
          />
        </div>

        {/* Tip Preview */}
        {tipAmount && (
          <Alert>
            <Heart className="h-4 w-4" />
            <AlertDescription>
              <strong>Tip Preview:</strong><br />
              Amount: {tipAmount} {tipToken}<br />
              Message: {getTipMessage()}<br />
              To: {yourWalletAddress.slice(0, 6)}...{yourWalletAddress.slice(-4)}
            </AlertDescription>
          </Alert>
        )}

        {/* Send Tip Button */}
        <Button
          onClick={handleSendTip}
          disabled={!tipAmount || !isConnected || isProcessing}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Tip...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Send Tip</span>
            </div>
          )}
        </Button>

        {/* Error Display */}
        {error && (
          <Alert className="bg-red-100 border-red-400 text-red-800">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Wallet Connection Notice */}
        {!isConnected && isInstalled && (
          <Alert>
            <AlertDescription>
              Please connect your wallet to send a tip.
            </AlertDescription>
          </Alert>
        )}

        {!isInstalled && (
          <Alert>
            <AlertDescription>
              MiniKit not detected. Please open this app in World App to send tips.
            </AlertDescription>
          </Alert>
        )}

        {/* Developer Info */}
        <div className="text-center text-xs text-gray-500 pt-4 border-t">
          <p>Tips go directly to the developer</p>
          <p className="font-mono text-xs mt-1">
            {yourWalletAddress.slice(0, 6)}...{yourWalletAddress.slice(-4)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
