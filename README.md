# GHOSTART NFT Marketplace - MiniKit Template

A complete NFT marketplace built on World Chain using the official MiniKit template structure. This application demonstrates all the key features of World Mini Apps including wallet authentication, identity verification, token swapping, and more.

## Features

### 🎨 NFT Marketplace
- **Free NFT Claiming**: Users can claim free NFTs (limited to 1 per wallet)
- **Token Swapping**: Swap between WLD and GHOSTART tokens
- **World ID Verification**: Bot-free experiences with privacy-preserving verification

### 💰 Token Integration
- **GHOSTART Token**: Native token with current pricing (1 GHOSTART = $0.000009 USDT)
- **PUF Trading**: Direct integration with PUF marketplace
- **Tip System**: Users can send tips to support development

### 🌍 World Chain Integration
- **MiniKit Integration**: Full MiniKit template compliance
- **Wallet Authentication**: SIWE-based authentication
- **Notifications**: World App notification system
- **Multi-language Support**: 6 languages supported (EN, ES, TH, JA, KO, PT)

## Template Structure

This project follows the official MiniKit template structure:

```
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── page.tsx        # Home page
│   │   ├── verify/         # World ID verification
│   │   ├── swap/           # Token swapping
│   │   ├── claim/          # Free NFT claiming
│   │   ├── tip/            # Tip system
│   │   └── notifications/  # Notification settings
│   └── api/                # Backend API routes
│       ├── nonce/          # SIWE nonce generation
│       ├── complete-siwe/  # SIWE verification
│       └── verify/         # World ID proof verification
├── components/
│   ├── minikit-provider.tsx    # MiniKit provider
│   ├── wallet-connect.tsx      # Wallet authentication
│   ├── world-chain-banner.tsx  # Trading banner
│   ├── token-display.tsx       # Token information
│   ├── tip-feature.tsx         # Tip functionality
│   └── mobile-nav.tsx          # Mobile navigation
└── lib/
    ├── translations.ts      # Multi-language support
    ├── formatting.ts        # Number formatting utilities
    └── i18n.ts             # Internationalization config
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Mini App Configuration
NEXT_PUBLIC_APP_ID=app_cc2463e69dbce149c2073d4ca593af75
NEXT_PUBLIC_MINI_APP_API_KEY=your_api_key_here

# Wallet Configuration
NEXT_PUBLIC_WALLET_ADDRESS=0x32f1e35291967c07ec02aa81394dbf87d1d25e52

# Token Configuration
NEXT_PUBLIC_GHOSTART_TOKEN_ADDRESS=0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990
NEXT_PUBLIC_GHOSTART_PRICE_USDT=0.000009

# World Chain Configuration
NEXT_PUBLIC_WORLD_CHAIN_RPC_URL=https://worldchain.worldcoin.org
NEXT_PUBLIC_WORLD_CHAIN_CHAIN_ID=480
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and update with your values

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in World App**:
   The application runs on `http://localhost:3001` and is optimized for mobile use within World App

## MiniKit Integration

This template demonstrates proper MiniKit integration:

### Wallet Authentication
- Uses SIWE (Sign-In with Ethereum) for secure authentication
- Follows official MiniKit wallet auth patterns
- Includes proper nonce generation and verification

### Identity Verification
- Implements World ID incognito actions
- Proper proof verification on backend
- Follows MiniKit verify command patterns

### Token Operations
- Pay command for sending tips
- Proper token amount formatting
- Integration with World Chain tokens

## Translation System

The application supports 6 languages with translations only affecting UI elements:
- English (EN)
- Spanish (ES) 
- Thai (TH)
- Japanese (JA)
- Korean (KO)
- Portuguese (PT)

**Important**: Translations only affect menu and UI elements, not technical components, smart contracts, or verification systems.

## Deployment

The application is ready for deployment on any platform that supports Next.js:

```bash
npm run build
npm start
```

## World Chain Integration

- **Network**: World Chain Mainnet (Chain ID: 480)
- **RPC**: https://worldchain.worldcoin.org
- **Explorer**: https://worldscan.org
- **Bridge**: https://worldchain-mainnet.bridge.alchemy.com

## Support

For questions or support:
- Developer Telegram: @worldcoindevelopers
- World Chain Documentation: https://docs.world.org/world-chain
- MiniKit Documentation: https://docs.world.org/mini-apps

## License

This project is built using the official MiniKit template and follows World Chain development guidelines.