# 🚀 Smart Contract Deployment Steps

## 📋 **Deployment Checklist**

### **Step 1: Open Remix IDE**
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create new workspace: "GHOSTART-Marketplace"

### **Step 2: Install Dependencies**
1. Go to "File Manager" tab
2. Click "Dependencies"
3. Add: `@openzeppelin/contracts@4.9.0`

### **Step 3: Upload Contracts**
1. Create new file: `GhostArtNFT.sol` in contracts folder
2. Create new file: `GhostArtMarketplace.sol` in contracts folder
3. Copy the contract code from the files I created

### **Step 4: Compile Contracts**
1. Go to "Solidity Compiler" tab
2. Select compiler version: `0.8.28`
3. Click "Compile GhostArtNFT.sol"
4. Click "Compile GhostArtMarketplace.sol"

### **Step 5: Connect Wallet**
1. Go to "Deploy & Run Transactions" tab
2. Select "Injected Provider - MetaMask"
3. Make sure you're connected to World Chain Sepolia
4. Get testnet ETH from [World Chain Sepolia Faucet](https://www.alchemy.com/faucets/world-chain-sepolia)

### **Step 6: Deploy GhostArtNFT Contract**
1. Select contract: `GhostArtNFT`
2. Click "Deploy"
3. **SAVE THE CONTRACT ADDRESS** - You'll need this for the marketplace!

### **Step 7: Deploy GhostArtMarketplace Contract**
1. Select contract: `GhostArtMarketplace`
2. Constructor arguments:
   - `0x2cFc85d8E48F8EAB294be644d9E25C3030863003` (WLD Token)
   - `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990` (GHOSTART Token)
   - `[Your deployed NFT contract address]` (From Step 6)
   - `[Your wallet address]` (For fee collection)
3. Click "Deploy"
4. **SAVE THE MARKETPLACE CONTRACT ADDRESS**

### **Step 8: Update Frontend**
After deployment, update your frontend with the contract addresses:

```javascript
// lib/contracts.js
export const CONTRACTS = {
  NFT_COLLECTION: 'YOUR_DEPLOYED_NFT_ADDRESS',
  MARKETPLACE: 'YOUR_DEPLOYED_MARKETPLACE_ADDRESS',
  WLD_TOKEN: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003',
  GHOSTART_TOKEN: '0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990'
};
```

## 🔑 **Required Information**

### **Token Addresses:**
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`

### **Your Information:**
- **Wallet Address**: Your MetaMask address (for fee collection)
- **Testnet ETH**: Get from World Chain Sepolia Faucet

## 🧪 **Testing After Deployment**

### **Test NFT Contract:**
1. Mint an NFT
2. Check ownership
3. Test free mint functionality

### **Test Marketplace:**
1. List an NFT
2. Buy with WLD
3. Buy with GHOSTART
4. Test fee collection

## 📱 **Next Steps After Deployment**

1. **Update Frontend**: Add contract addresses
2. **Test Integration**: Verify all features work
3. **Deploy to Production**: Deploy frontend to Vercel/Netlify
4. **Announce Launch**: Your marketplace is live!

---

## 🎯 **Ready to Deploy!**

Follow these steps to deploy your smart contracts to World Chain. The process should take about 15-30 minutes.

**Your GHOSTART NFT marketplace will be live on World Chain! 🚀**



