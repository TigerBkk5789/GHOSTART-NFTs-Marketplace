# 🚀 Complete Smart Contract Deployment Guide

## 🎯 **Two Deployment Methods Available**

### **Method 1: Remix IDE (Recommended - No Installation Required)**
### **Method 2: Foundry CLI (Advanced - Requires Installation)**

---

## 🌐 **Method 1: Remix IDE Deployment (Easiest)**

### **Step 1: Open Remix IDE**
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create new workspace: "GHOSTART-Marketplace"

### **Step 2: Install Dependencies**
1. Go to "File Manager" tab
2. Click "Dependencies"
3. Add: `@openzeppelin/contracts@4.9.0`

### **Step 3: Upload Contracts**
1. Create `GhostArtNFT.sol` in contracts folder
2. Create `GhostArtMarketplace.sol` in contracts folder
3. Copy code from the files in your project

### **Step 4: Compile Contracts**
1. Go to "Solidity Compiler" tab
2. Select compiler version: `0.8.28`
3. Compile both contracts

### **Step 5: Deploy to World Chain Sepolia**
1. Go to "Deploy & Run Transactions" tab
2. Connect MetaMask to World Chain Sepolia
3. Get testnet ETH from [World Chain Sepolia Faucet](https://www.alchemy.com/faucets/world-chain-sepolia)
4. Deploy `GhostArtNFT` first
5. Deploy `GhostArtMarketplace` with constructor arguments

**Constructor Arguments for Marketplace:**
```
WLD Token: 0x2cFc85d8E48F8EAB294be644d9E25C3030863003
GHOSTART Token: 0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990
NFT Contract: [Your deployed NFT address]
Fee Collector: [Your wallet address]
```

---

## ⚡ **Method 2: Foundry CLI Deployment (Advanced)**

### **Step 1: Install Foundry (Windows)**

Try these methods in order:

**Method A: PowerShell (Recommended)**
```powershell
powershell -Command "irm https://windows.paradigm.xyz | iex"
```

**Method B: Winget**
```bash
winget install --id Foundry.Foundry
```

**Method C: Manual Download**
1. Go to [Foundry Releases](https://github.com/foundry-rs/foundry/releases)
2. Download `foundry_nightly_windows_amd64.tar.gz`
3. Extract and add to PATH

### **Step 2: Initialize Foundry Project**
```bash
forge init ghostart-contracts --no-git
cd ghostart-contracts
```

### **Step 3: Add Dependencies**
```bash
forge install OpenZeppelin/openzeppelin-contracts
```

### **Step 4: Create Contract Files**
Create `src/GhostArtNFT.sol` and `src/GhostArtMarketplace.sol` with the contract code.

### **Step 5: Compile Contracts**
```bash
forge build
```

### **Step 6: Generate Wallet**
```bash
cast wallet new
```

### **Step 7: Fund Wallet**
Get testnet ETH from [World Chain Sepolia Faucet](https://www.alchemy.com/faucets/world-chain-sepolia)

### **Step 8: Deploy Contracts**

**Deploy NFT Contract:**
```bash
forge create src/GhostArtNFT.sol:GhostArtNFT \
  --rpc-url https://worldchain-sepolia.g.alchemy.com/public \
  --private-key YOUR_PRIVATE_KEY \
  --verify \
  --etherscan-api-key YOUR_API_KEY
```

**Deploy Marketplace Contract:**
```bash
forge create src/GhostArtMarketplace.sol:GhostArtMarketplace \
  --rpc-url https://worldchain-sepolia.g.alchemy.com/public \
  --private-key YOUR_PRIVATE_KEY \
  --constructor-args \
    0x2cFc85d8E48F8EAB294be644d9E25C3030863003 \
    0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990 \
    YOUR_NFT_CONTRACT_ADDRESS \
    YOUR_WALLET_ADDRESS \
  --verify \
  --etherscan-api-key YOUR_API_KEY
```

---

## 🔑 **Required Information**

### **Token Addresses:**
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`

### **Network Information:**
- **RPC URL**: `https://worldchain-sepolia.g.alchemy.com/public`
- **Chain ID**: `480`
- **Explorer**: [Worldscan](https://worldscan.org)

### **Your Information:**
- **Wallet Address**: Your MetaMask address
- **Private Key**: Keep secure!
- **Testnet ETH**: Get from faucet

---

## 📱 **After Deployment**

### **Step 1: Save Contract Addresses**
- NFT Contract Address: `0x...`
- Marketplace Contract Address: `0x...`

### **Step 2: Update Frontend**
```javascript
// lib/contracts.js
export const CONTRACTS = {
  NFT_COLLECTION: 'YOUR_DEPLOYED_NFT_ADDRESS',
  MARKETPLACE: 'YOUR_DEPLOYED_MARKETPLACE_ADDRESS',
  WLD_TOKEN: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003',
  GHOSTART_TOKEN: '0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990'
};
```

### **Step 3: Test Integration**
1. Test free NFT claiming
2. Test marketplace functionality
3. Test token swapping
4. Verify all features work

### **Step 4: Deploy to Production**
1. Deploy frontend to Vercel/Netlify
2. Update with deployed contract addresses
3. Announce launch!

---

## 🧪 **Testing Your Contracts**

### **Test NFT Contract:**
1. Mint an NFT
2. Check ownership
3. Test free mint functionality

### **Test Marketplace:**
1. List an NFT
2. Buy with WLD
3. Buy with GHOSTART
4. Test fee collection

---

## 🎯 **Recommendation**

**Use Remix IDE Method** - It's easier, doesn't require installation, and works perfectly for deployment.

**Use Foundry Method** - Only if you need advanced features like automated testing and deployment scripts.

---

## 🚀 **Ready to Deploy!**

Choose your preferred method and follow the steps. The Remix IDE method is recommended for most users.

**Your GHOSTART NFT marketplace will be live on World Chain! 🎊**



