# GHOSTART NFT Marketplace - Deployment Guide

## 🌟 Project Overview

GHOSTART is a comprehensive NFT marketplace built on World Chain with the following features:

- **Free NFT Claiming**: Users can claim free NFTs (limited to 1 per wallet)
- **Token Swapping**: Swap between WLD and GHOSTART tokens
- **NFT Marketplace**: Buy/sell NFTs with dual token support
- **World ID Integration**: Privacy-preserving identity verification
- **Multi-language Support**: 6 languages with proper localization

## 📋 Prerequisites

### Required Software
1. **Node.js** (v18 or later)
2. **Foundry** (for smart contract deployment)
3. **Git**

### Installation Commands
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install Node.js dependencies
npm install
```

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd GHOSTART-NFTs-Marketplace
npm install
```

### 2. Environment Configuration
```bash
cp env.example .env
# Edit .env with your configuration
```

Required environment variables:
- `PRIVATE_KEY`: Your deployment wallet private key
- `FEE_COLLECTOR`: Address to receive marketplace fees
- `WORLDSCAN_API_KEY`: API key for contract verification

### 3. Deploy Smart Contracts

#### Testnet Deployment (Recommended First)
```bash
./deploy.sh
```

#### Mainnet Deployment (After Testing)
```bash
./deploy-mainnet.sh
```

### 4. Update Frontend
After deployment, update your frontend with the deployed contract addresses in the `.env` file.

### 5. Deploy Frontend
```bash
npm run build
npm run start
```

## 🔧 Smart Contracts

### Contract Architecture

1. **GhostArtNFT.sol**
   - ERC721 NFT collection
   - Free minting functionality (1000 free NFTs)
   - Paid minting with configurable price
   - Owner minting for promotions

2. **GhostArtMarketplace.sol**
   - Dual token support (WLD + GHOSTART)
   - Listing and bidding system
   - Offer system with expiration
   - Fee collection (2.5%)

### Key Features

#### Free NFT Claiming
- 1000 free NFTs available
- 1 NFT per wallet limit
- No gas fees required
- Automatic allocation tracking

#### Token Swapping
- WLD ↔ GHOSTART token swaps
- Current rate: 1 GHOSTART = 0.000009 USDT
- Smart contract security
- Integration with PUF marketplace

#### Marketplace Features
- List NFTs for sale
- Buy with WLD or GHOSTART tokens
- Make offers on listings
- Cancel listings and offers
- Fee collection system

## 🌐 Frontend Features

### Multi-language Support
- English, Spanish, Thai, Japanese, Korean, Portuguese
- Localization only affects UI/menu elements
- Technical documentation remains in English
- Smart contracts maintain English standards

### Pages Structure
- **Home**: Token information and trading links
- **Claim**: Free NFT claiming interface
- **Swap**: Token swapping interface
- **Verify**: World ID verification

### Mobile-First Design
- Responsive design for all screen sizes
- Mobile navigation with 4 main sections
- Optimized for World App integration

## 🔐 Security Features

### Smart Contract Security
- ReentrancyGuard on all payment functions
- Access control (Ownable) for admin functions
- Input validation on all public functions
- Safe transfer patterns for ERC20/ERC721
- Emergency withdraw functions

### Frontend Security
- World ID integration for identity verification
- Secure wallet connection
- Input validation and sanitization
- HTTPS enforcement

## 📊 Testing

### Run Smart Contract Tests
```bash
forge test -vvv
```

### Test Coverage
- NFT minting (free and paid)
- Marketplace listing and buying
- Token swapping
- Free mint allocation
- Security scenarios

## 🌍 World Chain Integration

### Network Details
- **Testnet**: World Chain Sepolia
- **Mainnet**: World Chain
- **RPC**: Alchemy endpoints
- **Explorer**: WorldScan

### Token Addresses & Pricing
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`
- **Current Rate**: 1 GHOSTART = 0.000009 USDT

## 📱 World App Integration

### MiniKit Features
- Wallet connection
- Identity verification
- Transaction signing
- Deep linking support

### App Configuration
- App ID: `app_cc2463e69dbce149c2073d4ca593af75`
- PUF Integration: Direct links to trading
- QR Code generation for easy access

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Test contracts on local testnet
- [ ] Run full test suite
- [ ] Verify environment variables
- [ ] Check wallet balance for gas fees

### Contract Deployment
- [ ] Deploy to World Chain Sepolia
- [ ] Verify contracts on WorldScan
- [ ] Test all contract functions
- [ ] Deploy to mainnet (when ready)

### Frontend Deployment
- [ ] Update contract addresses
- [ ] Test all frontend features
- [ ] Verify multi-language support
- [ ] Test mobile responsiveness

## 📞 Support

### Documentation
- [World Chain Docs](https://world.org/developers)
- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

### Community
- Discord: [GHOSTART Community]
- Twitter: [@GHOSTART_NFT]
- Website: [ghostart.world]

## 🔄 Updates and Maintenance

### Regular Tasks
- Monitor contract events
- Update token prices
- Manage free mint allocation
- Security audits

### Emergency Procedures
- Emergency pause functionality
- Withdraw stuck funds
- Update contract parameters
- Community communication

---

**⚠️ Important**: Always test thoroughly on testnet before deploying to mainnet. Keep your private keys secure and never commit them to version control.

