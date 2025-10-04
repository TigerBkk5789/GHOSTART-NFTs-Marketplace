/**
 * Notification service for GHOSTART NFT Marketplace
 * Follows World App notification guidelines
 */

export interface NotificationData {
  app_id: string
  wallet_addresses: string[]
  localisations: {
    language: string
    title: string
    message: string
  }[]
  mini_app_path: string
}

export interface NotificationPermission {
  granted: boolean
  canRequest: boolean
}

export class NotificationService {
  private apiKey: string
  private appId: string

  constructor(apiKey: string, appId: string) {
    this.apiKey = apiKey
    this.appId = appId
  }

  /**
   * Send notification following World App guidelines
   * - Functional, not marketing-related
   * - Directly related to the mini app
   * - Relevant to the user
   */
  async sendNotification(data: Omit<NotificationData, 'app_id'>): Promise<boolean> {
    try {
      const response = await fetch('https://developer.worldcoin.org/api/v2/minikit/send-notification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          app_id: this.appId,
        }),
      })

      if (!response.ok) {
        console.error('Failed to send notification:', response.statusText)
        return false
      }

      return true
    } catch (error) {
      console.error('Error sending notification:', error)
      return false
    }
  }

  /**
   * Request notification permissions from user
   */
  async requestPermission(): Promise<NotificationPermission> {
    try {
      // This would integrate with MiniKit's permission system
      // For now, we'll return a mock response
      return {
        granted: false,
        canRequest: true,
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return {
        granted: false,
        canRequest: false,
      }
    }
  }

  /**
   * Get current notification permissions
   */
  async getPermissions(): Promise<NotificationPermission> {
    try {
      // This would integrate with MiniKit's permission system
      // For now, we'll return a mock response
      return {
        granted: false,
        canRequest: true,
      }
    } catch (error) {
      console.error('Error getting notification permissions:', error)
      return {
        granted: false,
        canRequest: false,
      }
    }
  }

  /**
   * Send NFT minted notification
   * Following World App guidelines: functional, relevant, directly related to mini app
   */
  async sendNFTMintedNotification(walletAddress: string, tokenId: string, locale: string = 'en'): Promise<boolean> {
    const messages = {
      en: {
        title: "🎨 NFT Ready!",
        message: "Your GHOSTART NFT #${tokenId} is ready ${username}!"
      },
      es: {
        title: "🎨 NFT Listo!",
        message: "Tu NFT GHOSTART #${tokenId} está listo ${username}!"
      },
      th: {
        title: "🎨 NFT พร้อม!",
        message: "NFT GHOSTART #${tokenId} ของคุณพร้อมแล้ว ${username}!"
      },
      ja: {
        title: "🎨 NFT完成!",
        message: "GHOSTART NFT #${tokenId} が完成しました ${username}!"
      },
      ko: {
        title: "🎨 NFT 준비완료!",
        message: "GHOSTART NFT #${tokenId}이 준비되었습니다 ${username}!"
      },
      pt: {
        title: "🎨 NFT Pronto!",
        message: "Seu NFT GHOSTART #${tokenId} está pronto ${username}!"
      }
    }

    const message = messages[locale as keyof typeof messages] || messages.en

    return this.sendNotification({
      wallet_addresses: [walletAddress],
      localisations: [{
        language: locale,
        title: message.title,
        message: message.message.replace('${tokenId}', tokenId)
      }],
      mini_app_path: `worldapp://mini-app?app_id=${this.appId}&path=/claim`
    })
  }

  /**
   * Send free NFT claimed notification
   */
  async sendFreeNFTClaimedNotification(walletAddress: string, locale: string = 'en'): Promise<boolean> {
    const messages = {
      en: {
        title: "🎁 Free NFT claimed!",
        message: "Awesome ${username}! You've successfully claimed your free GHOSTART NFT."
      },
      es: {
        title: "🎁 ¡NFT gratis reclamado!",
        message: "¡Increíble ${username}! Has reclamado exitosamente tu NFT GHOSTART gratis."
      },
      th: {
        title: "🎁 รับ NFT ฟรีแล้ว!",
        message: "ยอดเยี่ยม ${username}! คุณได้รับ NFT GHOSTART ฟรีเรียบร้อยแล้ว"
      },
      ja: {
        title: "🎁 無料NFTを獲得しました！",
        message: "素晴らしい ${username}! 無料のGHOSTART NFTを正常に獲得しました。"
      },
      ko: {
        title: "🎁 무료 NFT 획득!",
        message: "훌륭합니다 ${username}! 무료 GHOSTART NFT를 성공적으로 획득했습니다."
      },
      pt: {
        title: "🎁 NFT grátis reivindicado!",
        message: "Incrível ${username}! Você reivindicou com sucesso seu NFT GHOSTART grátis."
      }
    }

    const message = messages[locale as keyof typeof messages] || messages.en

    return this.sendNotification({
      wallet_addresses: [walletAddress],
      localisations: [{
        language: locale,
        title: message.title,
        message: message.message
      }],
      mini_app_path: `worldapp://mini-app?app_id=${this.appId}&path=/claim`
    })
  }

  /**
   * Send NFT listed notification
   */
  async sendNFTListedNotification(walletAddress: string, tokenId: string, price: string, locale: string = 'en'): Promise<boolean> {
    const messages = {
      en: {
        title: "📝 NFT listed for sale!",
        message: "Great ${username}! Your GHOSTART NFT #${tokenId} is now listed for ${price} WLD."
      },
      es: {
        title: "📝 ¡NFT listado para venta!",
        message: "¡Genial ${username}! Tu NFT GHOSTART #${tokenId} ahora está listado por ${price} WLD."
      },
      th: {
        title: "📝 NFT วางขายแล้ว!",
        message: "เยี่ยม ${username}! NFT GHOSTART #${tokenId} ของคุณถูกวางขายในราคา ${price} WLD แล้ว"
      },
      ja: {
        title: "📝 NFTが販売に出品されました！",
        message: "素晴らしい ${username}! GHOSTART NFT #${tokenId} が ${price} WLD で出品されました。"
      },
      ko: {
        title: "📝 NFT 판매 등록!",
        message: "훌륭합니다 ${username}! GHOSTART NFT #${tokenId}이 ${price} WLD에 판매 등록되었습니다."
      },
      pt: {
        title: "📝 NFT listado para venda!",
        message: "Ótimo ${username}! Seu NFT GHOSTART #${tokenId} agora está listado por ${price} WLD."
      }
    }

    const message = messages[locale as keyof typeof messages] || messages.en

    return this.sendNotification({
      wallet_addresses: [walletAddress],
      localisations: [{
        language: locale,
        title: message.title,
        message: message.message.replace('${tokenId}', tokenId).replace('${price}', price)
      }],
      mini_app_path: `worldapp://mini-app?app_id=${this.appId}&path=/`
    })
  }

  /**
   * Send NFT sold notification
   */
  async sendNFTSoldNotification(walletAddress: string, tokenId: string, price: string, locale: string = 'en'): Promise<boolean> {
    const messages = {
      en: {
        title: "💰 NFT sold!",
        message: "Congratulations ${username}! Your GHOSTART NFT #${tokenId} sold for ${price} WLD."
      },
      es: {
        title: "💰 ¡NFT vendido!",
        message: "¡Felicidades ${username}! Tu NFT GHOSTART #${tokenId} se vendió por ${price} WLD."
      },
      th: {
        title: "💰 NFT ขายแล้ว!",
        message: "ยินดีด้วย ${username}! NFT GHOSTART #${tokenId} ของคุณขายได้ในราคา ${price} WLD"
      },
      ja: {
        title: "💰 NFTが売却されました！",
        message: "おめでとうございます ${username}! GHOSTART NFT #${tokenId} が ${price} WLD で売却されました。"
      },
      ko: {
        title: "💰 NFT 판매 완료!",
        message: "축하합니다 ${username}! GHOSTART NFT #${tokenId}이 ${price} WLD에 판매되었습니다."
      },
      pt: {
        title: "💰 NFT vendido!",
        message: "Parabéns ${username}! Seu NFT GHOSTART #${tokenId} foi vendido por ${price} WLD."
      }
    }

    const message = messages[locale as keyof typeof messages] || messages.en

    return this.sendNotification({
      wallet_addresses: [walletAddress],
      localisations: [{
        language: locale,
        title: message.title,
        message: message.message.replace('${tokenId}', tokenId).replace('${price}', price)
      }],
      mini_app_path: `worldapp://mini-app?app_id=${this.appId}&path=/`
    })
  }

  /**
   * Send tip received notification
   */
  async sendTipReceivedNotification(walletAddress: string, amount: string, token: string, locale: string = 'en'): Promise<boolean> {
    const messages = {
      en: {
        title: "💝 Tip received!",
        message: "Thank you ${username}! You received a ${amount} ${token} tip."
      },
      es: {
        title: "💝 ¡Propina recibida!",
        message: "¡Gracias ${username}! Recibiste una propina de ${amount} ${token}."
      },
      th: {
        title: "💝 รับทิปแล้ว!",
        message: "ขอบคุณ ${username}! คุณได้รับทิป ${amount} ${token}"
      },
      ja: {
        title: "💝 チップを受け取りました！",
        message: "ありがとうございます ${username}! ${amount} ${token} のチップを受け取りました。"
      },
      ko: {
        title: "💝 팁을 받았습니다!",
        message: "감사합니다 ${username}! ${amount} ${token} 팁을 받았습니다."
      },
      pt: {
        title: "💝 Gorjeta recebida!",
        message: "Obrigado ${username}! Você recebeu uma gorjeta de ${amount} ${token}."
      }
    }

    const message = messages[locale as keyof typeof messages] || messages.en

    return this.sendNotification({
      wallet_addresses: [walletAddress],
      localisations: [{
        language: locale,
        title: message.title,
        message: message.message.replace('${amount}', amount).replace('${token}', token)
      }],
      mini_app_path: `worldapp://mini-app?app_id=${this.appId}&path=/tip`
    })
  }
}

// Create singleton instance
export const notificationService = new NotificationService(
  process.env.NEXT_PUBLIC_MINI_APP_API_KEY || '',
  process.env.NEXT_PUBLIC_APP_ID || 'app_cc2463e69dbce149c2073d4ca593af75'
)
