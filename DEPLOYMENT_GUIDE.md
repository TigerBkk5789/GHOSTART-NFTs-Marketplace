# 🚀 GHOSTART NFT Marketplace - Complete Deployment Guide

## 📋 Current Status

✅ **Frontend Application**: Fully built and ready for deployment  
✅ **Smart Contracts**: Created and ready for deployment  
✅ **Features**: All requested features implemented  
⚠️ **Smart Contract Deployment**: Requires Foundry installation  

## 🌐 Frontend Deployment Options

### Option 1: Vercel (Recommended)

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy to Production**:
   ```bash
   vercel --prod --yes
   ```

3. **Custom Domain** (Optional):
   - Go to Vercel Dashboard
   - Add your custom domain
   - Update DNS settings

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and Deploy**:
   ```bash
   netlify login
   netlify deploy --prod --dir=.next
   ```

### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d .next"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### Option 4: Manual Server Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "ghostart-marketplace" -- start
   ```

## 🔗 Smart Contract Deployment

### Prerequisites

1. **Install Foundry** (Windows):
   ```powershell
   # Download from GitHub releases
   Invoke-WebRequest -Uri "https://github.com/foundry-rs/foundry/releases/download/nightly-2024-01-01/foundry_nightly_windows_amd64.tar.gz" -OutFile "foundry.tar.gz"
   # Extract and add to PATH
   ```

2. **Alternative: Use Remix IDE**:
   - Go to [remix.ethereum.org](https://remix.ethereum.org)
   - Upload contract files
   - Deploy directly from browser

3. **Alternative: Use Hardhat**:
   ```bash
   npm install --save-dev hardhat
   npx hardhat init
   ```

### Deployment Steps

1. **Create .env file**:
   ```bash
   cp env.example .env
   # Edit .env with your values
   ```

2. **Deploy to World Chain Sepolia**:
   ```bash
   # Deploy NFT Contract
   forge create src/GhostArtNFT.sol:GhostArtNFT \
     --rpc-url https://worldchain-sepolia.g.alchemy.com/public \
     --private-key $PRIVATE_KEY \
     --verify

   # Deploy Marketplace Contract
   forge create src/GhostArtMarketplace.sol:GhostArtMarketplace \
     --rpc-url https://worldchain-sepolia.g.alchemy.com/public \
     --private-key $PRIVATE_KEY \
     --constructor-args \
       "0x2cFc85d8E48F8EAB294be644d9E25C3030863003" \
       "0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990" \
       "$NFT_ADDRESS" \
       "$FEE_COLLECTOR" \
     --verify
   ```

## 🔧 Environment Configuration

### Required Environment Variables

```env
# Deployment
PRIVATE_KEY=your_private_key_here
FEE_COLLECTOR=your_fee_collector_address_here
WORLDSCAN_API_KEY=your_worldscan_api_key_here

# RPC URLs
WORLDCHAIN_SEPOLIA_RPC=https://worldchain-sepolia.g.alchemy.com/public
WORLDCHAIN_MAINNET_RPC=https://worldchain-mainnet.g.alchemy.com/public

# Contract Addresses (after deployment)
NFT_CONTRACT_ADDRESS=deployed_nft_address
MARKETPLACE_CONTRACT_ADDRESS=deployed_marketplace_address

# Token Pricing
NEXT_PUBLIC_GHOSTART_PRICE_USDT=0.000009
NEXT_PUBLIC_WLD_TO_GHOSTART_RATIO=277777777

# World ID
NEXT_PUBLIC_APP_ID=your_world_id_app_id
```

## 📱 World Chain Integration

### Mini App Configuration

1. **Update World ID App ID** in environment variables
2. **Configure Mini App URL** in World ID dashboard
3. **Test QR Code** functionality
4. **Verify World ID integration**

### Token Integration

- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`
- **Pricing**: 1 GHOSTART = $0.000009 USDT

## 🧪 Testing

### Frontend Testing

1. **Local Testing**:
   ```bash
   npm run dev
   # Test all pages and features
   ```

2. **Production Build Testing**:
   ```bash
   npm run build
   npm start
   # Test production build
   ```

### Smart Contract Testing

1. **Run Tests**:
   ```bash
   forge test -vvv
   ```

2. **Test on Sepolia**:
   - Deploy to testnet
   - Test all functions
   - Verify contract interactions

## 🚀 Quick Start Commands

### Frontend Deployment (Choose One)

```bash
# Vercel
vercel login && vercel --prod --yes

# Netlify
npm install -g netlify-cli && netlify login && netlify deploy --prod --dir=.next

# Manual
npm run build && npm start
```

### Smart Contract Deployment

```bash
# Using Foundry
forge create src/GhostArtNFT.sol:GhostArtNFT --rpc-url $RPC_URL --private-key $PRIVATE_KEY

# Using Remix IDE
# Upload contracts to remix.ethereum.org and deploy
```

## 📊 Deployment Checklist

### Frontend
- [ ] Build successful (`npm run build`)
- [ ] All pages accessible
- [ ] Trading banner visible
- [ ] Multi-language support working
- [ ] Mobile navigation functional
- [ ] QR code generator working
- [ ] World ID integration ready

### Smart Contracts
- [ ] Contracts compiled successfully
- [ ] Tests passing
- [ ] Deployed to testnet
- [ ] Contract verification successful
- [ ] Frontend integration complete
- [ ] Ready for mainnet deployment

## 🔗 Useful Links

- **World Chain Docs**: https://docs.world.org/world-chain/developers
- **World ID MiniKit**: https://docs.world.org/minikit
- **Vercel Deployment**: https://vercel.com/docs
- **Netlify Deployment**: https://docs.netlify.com
- **Foundry Book**: https://book.getfoundry.sh

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**: Check dependencies and TypeScript errors
2. **Deployment Failures**: Verify environment variables
3. **Contract Deployment**: Ensure sufficient gas and correct RPC URL
4. **World ID Issues**: Verify app ID and configuration

### Support

- **Email**: support@ghostart.world
- **Documentation**: Check this guide and inline comments
- **Issues**: Create GitHub issue for bugs

---

## 🎉 Ready to Deploy!

Your GHOSTART NFT marketplace is fully prepared for deployment. Choose your preferred deployment method and follow the steps above.

**Current Status**: ✅ Frontend Ready | ⚠️ Smart Contracts Need Deployment
