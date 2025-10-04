# 🌍 GHOSTART MiniKit Integration Guide

## 📋 **Overview**

This guide covers the comprehensive MiniKit integration in the GHOSTART NFT marketplace, including all the latest features from the World ID MiniKit documentation.

## 🔧 **Features Implemented**

### ✅ **Core MiniKit Features**
- **Wallet Authentication**: Full SIWE integration with proper error handling
- **Identity Verification**: World ID verification with comprehensive error codes
- **Payment Processing**: WLD and GHOSTART token payments with MiniKit Pay command
- **Notifications**: Personalized notifications with username substitution
- **Transaction Monitoring**: Real-time transaction status tracking

### ✅ **Advanced Features**
- **User Verification**: Address Book contract integration for verification status
- **Username Support**: ENS-compatible usernames with profile pictures
- **Service Monitoring**: World services status monitoring
- **Error Handling**: Comprehensive error code handling for all MiniKit commands
- **Payment Methods**: Apple Pay and Google Pay integration support

## 🏗️ **Architecture**

### **API Routes**
```
/api/
├── check-verification/     # Address Book verification check
├── get-user/              # User information lookup
├── world-status/          # World services status
├── send-notification/     # MiniKit notifications
├── transaction/[id]/      # Transaction lookup
├── verify/                # World ID verification
└── complete-siwe/         # SIWE completion
```

### **Components**
```
components/
├── world-status-monitor.tsx    # Service status monitoring
├── user-verification.tsx       # User verification display
├── tip-feature.tsx            # Enhanced tip system
├── wallet-connect.tsx         # Improved wallet connection
└── notification-permission.tsx # Notification management
```

### **Library**
```
lib/
└── minikit-api.ts            # Comprehensive MiniKit API wrapper
```

## 🔑 **Key Classes and Utilities**

### **MiniKitAPI Class**
```typescript
// Core API wrapper with all MiniKit endpoints
const minikitAPI = new MiniKitAPI(apiKey)

// Available methods:
- getTransaction(transactionId)
- verifyWorldID(appId, verifyData)
- createAction(appId, actionData)
- sendNotification(notificationData)
- getUserGrantCycle()
- getWorldStatus(includeLogs)
- isUserVerified(walletAddress, rpcUrl)
- getUserByAddress(walletAddress)
```

### **Error Handling**
```typescript
// Comprehensive error code handling
import { MINIKIT_ERROR_CODES, MiniKitErrorHandler } from '@/lib/minikit-api'

// Error categories:
- VERIFY: verification_rejected, max_verifications_reached, etc.
- PAY: payment_rejected, insufficient_balance, etc.
- WALLET_AUTH: user_rejected, malformed_request, etc.
- TRANSACTION: user_rejected, simulation_failed, etc.
```

### **Payment Methods**
```typescript
// Apple Pay and Google Pay integration
import { PaymentMethods } from '@/lib/minikit-api'

// Available methods:
- PaymentMethods.isApplePayAvailable()
- PaymentMethods.isGooglePayAvailable()
- PaymentMethods.initializeApplePay(request)
- PaymentMethods.initializeGooglePay(request)
```

### **User Management**
```typescript
// User information and verification
import { UserManager } from '@/lib/minikit-api'

// Available methods:
- UserManager.getUserInfo(walletAddress)
- UserManager.sendPersonalizedNotification(address, type, data)
```

### **Service Monitoring**
```typescript
// World services status monitoring
import { WorldServicesMonitor } from '@/lib/minikit-api'

// Available methods:
- WorldServicesMonitor.getStatus(includeLogs)
- WorldServicesMonitor.isServiceOperational(serviceId)
- WorldServicesMonitor.getServiceUptime(serviceId, period)
```

## 📱 **Notification System**

### **Predefined Templates**
```typescript
// GHOSTART notification templates
GHOSTART_NOTIFICATIONS = {
  nftClaimSuccess: (username) => ({ title, message, path }),
  tradeSuccess: (username, amount, token) => ({ title, message, path }),
  tipReceived: (username, amount, token) => ({ title, message, path }),
  verificationComplete: (username) => ({ title, message, path }),
  newFeature: (username, feature) => ({ title, message, path }),
  maintenanceNotice: (username) => ({ title, message, path })
}
```

### **Usage Example**
```typescript
// Send personalized notification
await UserManager.sendPersonalizedNotification(
  walletAddress,
  'tipReceived',
  { amount: '5', token: 'WLD' }
)
```

## 🔍 **User Verification**

### **Address Book Integration**
```typescript
// Check if user is verified using Address Book contract
const isVerified = await minikitAPI.isUserVerified(
  walletAddress,
  'https://worldchain-mainnet.g.alchemy.com/public'
)
```

### **User Information**
```typescript
// Get user info with username and verification status
const userInfo = await UserManager.getUserInfo(walletAddress)
// Returns: { username, address, isVerified, profilePicture }
```

## 📊 **Service Monitoring**

### **Status Check**
```typescript
// Get all World services status
const status = await WorldServicesMonitor.getStatus(true) // include logs

// Check specific service
const isOperational = await WorldServicesMonitor.isServiceOperational('mini-apps')

// Get uptime ratio
const uptime = await WorldServicesMonitor.getServiceUptime('mini-apps', 7) // 7 days
```

## 💳 **Payment Integration**

### **Apple Pay Setup**
```typescript
const applePayRequest = {
  merchantIdentifier: 'merchant.com.ghostart',
  countryCode: 'US',
  currencyCode: 'USD',
  supportedNetworks: ['visa', 'masterCard'],
  merchantCapabilities: ['3DS'],
  total: {
    label: 'GHOSTART NFT',
    amount: '10.00'
  }
}

const result = await PaymentMethods.initializeApplePay(applePayRequest)
```

### **Google Pay Setup**
```typescript
const googlePayRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [{
    type: 'CARD',
    parameters: {
      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
      allowedCardNetworks: ['VISA', 'MASTERCARD']
    },
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      parameters: {
        gateway: 'stripe',
        gatewayMerchantId: 'your_merchant_id'
      }
    }
  }],
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPrice: '10.00',
    currencyCode: 'USD'
  },
  merchantInfo: {
    merchantId: 'your_merchant_id',
    merchantName: 'GHOSTART'
  }
}

const result = await PaymentMethods.initializeGooglePay(googlePayRequest)
```

## 🚨 **Error Handling**

### **Error Categories**
```typescript
// Verify errors
MINIKIT_ERROR_CODES.VERIFY = {
  VERIFICATION_REJECTED: 'verification_rejected',
  MAX_VERIFICATIONS_REACHED: 'max_verifications_reached',
  CREDENTIAL_UNAVAILABLE: 'credential_unavailable',
  // ... more error codes
}

// Pay errors
MINIKIT_ERROR_CODES.PAY = {
  PAYMENT_REJECTED: 'payment_rejected',
  INSUFFICIENT_BALANCE: 'insufficient_balance',
  TRANSACTION_FAILED: 'transaction_failed',
  // ... more error codes
}
```

### **Error Handling Example**
```typescript
try {
  const result = await MiniKit.commandsAsync.pay(payPayload)
  
  if (result.finalPayload.status === 'error') {
    const errorCode = result.finalPayload.error_code || 'generic_error'
    const errorMessage = MiniKitErrorHandler.getErrorMessage(errorCode, 'pay')
    const isRetryable = MiniKitErrorHandler.isRetryableError(errorCode, 'pay')
    
    // Handle error appropriately
    setError(errorMessage)
    if (isRetryable) {
      // Show retry option
    }
  }
} catch (error) {
  // Handle unexpected errors
}
```

## 🔧 **Environment Variables**

```bash
# Required environment variables
NEXT_PUBLIC_APP_ID=app_cc2463e69dbce149c2073d4ca593af75
NEXT_PUBLIC_MINI_APP_API_KEY=your_api_key_here
NEXT_PUBLIC_WALLET_ADDRESS=0x32f1e35291967c07ec02aa81394dbf87d1d25e52
NEXT_PUBLIC_GHOSTART_TOKEN_ADDRESS=0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990
NEXT_PUBLIC_GHOSTART_PRICE_USDT=0.000009
NEXT_PUBLIC_WORLD_CHAIN_RPC_URL=https://worldchain-mainnet.g.alchemy.com/public
NEXT_PUBLIC_WORLD_CHAIN_CHAIN_ID=480
```

## 📱 **Mobile Integration**

### **World App Features**
- **Deep Linking**: Direct links to specific app sections
- **QR Code Generation**: Easy access via QR codes
- **Mobile Navigation**: 6-tab mobile navigation system
- **Responsive Design**: Optimized for all screen sizes

### **MiniKit Commands**
```typescript
// Available MiniKit commands
- MiniKit.commandsAsync.walletAuth(input)
- MiniKit.commandsAsync.verify(input)
- MiniKit.commandsAsync.pay(input)
- MiniKit.commandsAsync.transaction(input)
```

## 🚀 **Deployment Checklist**

### **Pre-deployment**
- [ ] Set up Apple Pay merchant account
- [ ] Configure Google Pay API
- [ ] Set up notification templates
- [ ] Test all MiniKit commands
- [ ] Verify error handling

### **Production Setup**
- [ ] Update environment variables
- [ ] Configure production payment methods
- [ ] Set up monitoring alerts
- [ ] Test user verification flow
- [ ] Verify notification delivery

## 📚 **Additional Resources**

- [World ID MiniKit Documentation](https://developer.worldcoin.org/docs/minikit)
- [World ID API Reference](https://developer.worldcoin.org/api/v2)
- [World Services Status](https://status.worldcoin.org)
- [Address Book Contract](https://worldscan.org/address/0x57b930D551e677CC36e2fA036Ae2fe8FdaE0330D)
- [Apple Pay Integration](https://developer.apple.com/apple-pay/)
- [Google Pay Integration](https://developers.google.com/pay/api/web)

---

## 🎉 **Ready for Production!**

The GHOSTART NFT marketplace now includes comprehensive MiniKit integration with:
- ✅ Full error handling for all MiniKit commands
- ✅ User verification and username support
- ✅ Service monitoring and status tracking
- ✅ Payment method integration (Apple Pay, Google Pay)
- ✅ Personalized notification system
- ✅ Transaction monitoring and debugging
- ✅ Mobile-optimized user experience

The application is fully prepared for World Chain deployment with complete MiniKit functionality! 🚀


