# 🌍 World Chain Smart Contract Deployment Guide

## 📋 **Deployment Checklist**

### ✅ **Pre-Deployment Requirements**

1. **Environment Setup**
   - [ ] Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`
   - [ ] Install dependencies: `forge install`
   - [ ] Set up environment variables

2. **Environment Variables**
   ```bash
   # .env file
   PRIVATE_KEY=your_private_key_here
   FEE_COLLECTOR=0x32f1e35291967c07ec02aa81394dbf87d1d25e52
   WORLDSCAN_API_KEY=your_worldscan_api_key
   ```

3. **Wallet Requirements**
   - [ ] World Chain Sepolia testnet WLD for gas fees
   - [ ] Private key with sufficient balance
   - [ ] Fee collector address configured

### 🚀 **Deployment Commands**

#### **1. Test on Sepolia Testnet**
```bash
# Compile contracts
forge build

# Run tests
forge test

# Deploy to World Chain Sepolia
forge script script/Deploy.s.sol --rpc-url worldchain-sepolia --broadcast --verify
```

#### **2. Deploy to World Chain Mainnet**
```bash
# Deploy to World Chain Mainnet
forge script script/Deploy.s.sol --rpc-url worldchain-mainnet --broadcast --verify
```

### 📊 **Contract Addresses**

#### **World Chain Sepolia (Testnet)**
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`

#### **World Chain Mainnet**
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`

### 🔧 **Contract Configuration**

#### **GhostArtNFT.sol**
```solidity
- Max Supply: 10,000 NFTs
- Free Mint Supply: 1,000 NFTs
- Mint Price: 0.001 ETH
- Owner: Deployer address
```

#### **GhostArtMarketplace.sol**
```solidity
- Platform Fee: 2.5% (250/10000)
- Fee Collector: 0x32f1e35291967c07ec02aa81394dbf87d1d25e52
- WLD Token: 0x2cFc85d8E48F8EAB294be644d9E25C3030863003
- GHOSTART Token: 0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990
```

### 💰 **Pricing Configuration**

#### **Current Token Rates**
- **1 GHOSTART = $0.000009 USDT**
- **1 WLD ≈ $2.5 USDT**
- **1 WLD = 277,777,777 GHOSTART** (with 18 decimals)

#### **Marketplace Pricing**
```solidity
// When listing NFT for 1 WLD:
priceWLD = 1 * 10^18
priceGHOSTART = 1 * 10^18 * 277777777 * 10^18 = 277777777 * 10^36
```

### 🔍 **Verification Process**

#### **1. Contract Verification**
```bash
# Verify on WorldScan
forge verify-contract <CONTRACT_ADDRESS> <CONTRACT_NAME> --chain worldchain --etherscan-api-key $WORLDSCAN_API_KEY
```

#### **2. Post-Deployment Setup**
1. **Update Frontend Environment**
   ```bash
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=<deployed_nft_address>
   NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=<deployed_marketplace_address>
   ```

2. **Test Contract Functions**
   - [ ] Mint test NFT
   - [ ] List NFT for sale
   - [ ] Buy with WLD
   - [ ] Buy with GHOSTART
   - [ ] Claim free NFT
   - [ ] Cancel listing

### 🛡️ **Security Considerations**

#### **Access Controls**
- [ ] Owner functions properly protected
- [ ] Reentrancy guards in place
- [ ] Input validation implemented
- [ ] Emergency withdrawal functions tested

#### **Token Approvals**
- [ ] Users must approve marketplace for NFT transfers
- [ ] Users must approve marketplace for token payments
- [ ] Proper allowance checks implemented

### 📱 **Frontend Integration**

#### **Contract Interaction**
```typescript
// Example contract interaction
const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
const marketplaceContract = new ethers.Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, signer);

// Mint NFT
await nftContract.mintNFT(userAddress, tokenURI, { value: mintPrice });

// List NFT
await nftContract.setApprovalForAll(marketplaceAddress, true);
await marketplaceContract.listNFT(nftAddress, tokenId, priceInWLD);

// Buy with WLD
await wldToken.approve(marketplaceAddress, priceInWLD);
await marketplaceContract.buyWithWLD(listingId);
```

### 🚨 **Emergency Procedures**

#### **Emergency Pause**
```solidity
// If needed, add pause functionality
function emergencyPause() external onlyOwner {
    // Pause all non-essential functions
}
```

#### **Emergency Withdrawal**
```solidity
// Owner can withdraw stuck funds
function emergencyWithdraw() external onlyOwner {
    // Withdraw WLD and GHOSTART tokens
}
```

### 📊 **Monitoring & Analytics**

#### **Key Metrics to Track**
- [ ] Total NFTs minted
- [ ] Free NFTs claimed
- [ ] Marketplace volume (WLD/GHOSTART)
- [ ] Platform fees collected
- [ ] Active listings count

#### **Event Monitoring**
```solidity
// Key events to monitor
event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
event FreeNFTClaimed(address indexed to, uint256 indexed tokenId, string tokenURI);
event NFTListed(uint256 indexed listingId, address indexed seller, ...);
event NFTSold(uint256 indexed listingId, address indexed buyer, ...);
```

### 🔄 **Post-Deployment Tasks**

1. **Update Documentation**
   - [ ] Update contract addresses in README
   - [ ] Update frontend environment variables
   - [ ] Update deployment guide with actual addresses

2. **Community Communication**
   - [ ] Announce deployment on social media
   - [ ] Share contract addresses
   - [ ] Provide user guides

3. **Monitoring Setup**
   - [ ] Set up WorldScan monitoring
   - [ ] Configure alerts for large transactions
   - [ ] Monitor gas usage and costs

---

## 🎉 **Ready for World Chain Deployment!**

The smart contracts are fully configured and ready for deployment on World Chain. All pricing calculations have been updated to reflect the current GHOSTART token rate of $0.000009 USDT.

**Next Steps:**
1. Deploy to World Chain Sepolia testnet
2. Test all functionality
3. Deploy to World Chain mainnet
4. Update frontend with contract addresses
5. Launch the marketplace! 🚀