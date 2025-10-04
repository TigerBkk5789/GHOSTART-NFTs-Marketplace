# 🔗 Smart Contract Deployment - Alternative Methods

Since Foundry installation is having issues on Windows, here are alternative methods to deploy your smart contracts to World Chain.

## 🌐 Method 1: Remix IDE (Recommended)

### Step 1: Access Remix IDE
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create a new workspace called "GHOSTART-Marketplace"

### Step 2: Upload Contracts
1. Create new files in the `contracts` folder:
   - `GhostArtNFT.sol`
   - `GhostArtMarketplace.sol`

2. Copy the contract code from your local files:
   - `src/GhostArtNFT.sol`
   - `src/GhostArtMarketplace.sol`

### Step 3: Install Dependencies
1. Go to the "File Manager" tab
2. Click on "Dependencies" 
3. Add: `@openzeppelin/contracts@4.9.0`

### Step 4: Compile Contracts
1. Go to "Solidity Compiler" tab
2. Select compiler version: `0.8.28`
3. Click "Compile GhostArtNFT.sol"
4. Click "Compile GhostArtMarketplace.sol"

### Step 5: Deploy to World Chain Sepolia
1. Go to "Deploy & Run Transactions" tab
2. Select "Injected Provider - MetaMask" (or your wallet)
3. Make sure you're connected to World Chain Sepolia
4. Deploy contracts in this order:

#### Deploy GhostArtNFT:
- Contract: `GhostArtNFT`
- Click "Deploy"

#### Deploy GhostArtMarketplace:
- Contract: `GhostArtMarketplace`
- Constructor arguments:
  - `0x2cFc85d8E48F8EAB294be644d9E25C3030863003` (WLD Token)
  - `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990` (GHOSTART Token)
  - `[Your deployed NFT contract address]`
  - `[Your wallet address for fee collection]`
- Click "Deploy"

## 🔧 Method 2: Hardhat (Alternative)

### Step 1: Install Hardhat
```bash
npm install --save-dev hardhat
npx hardhat init
```

### Step 2: Configure hardhat.config.js
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    worldchainSepolia: {
      url: "https://worldchain-sepolia.g.alchemy.com/public",
      accounts: [process.env.PRIVATE_KEY]
    },
    worldchainMainnet: {
      url: "https://worldchain-mainnet.g.alchemy.com/public",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

### Step 3: Create Deployment Script
```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Deploy NFT
  const GhostArtNFT = await hre.ethers.getContractFactory("GhostArtNFT");
  const nft = await GhostArtNFT.deploy();
  await nft.deployed();
  console.log("GhostArtNFT deployed to:", nft.address);

  // Deploy Marketplace
  const GhostArtMarketplace = await hre.ethers.getContractFactory("GhostArtMarketplace");
  const marketplace = await GhostArtMarketplace.deploy(
    "0x2cFc85d8E48F8EAB294be644d9E25C3030863003", // WLD
    "0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990", // GHOSTART
    nft.address, // NFT contract
    "0xYourWalletAddress" // Fee collector
  );
  await marketplace.deployed();
  console.log("GhostArtMarketplace deployed to:", marketplace.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Step 4: Deploy
```bash
npx hardhat run scripts/deploy.js --network worldchainSepolia
```

## 🌍 Method 3: World Chain Web Interface

### Step 1: Access World Chain
1. Go to [world.org](https://world.org)
2. Connect your wallet
3. Navigate to "Developers" section

### Step 2: Use Contract Deployment Tool
1. Look for "Deploy Contract" or "Contract Factory"
2. Upload your contract bytecode
3. Provide constructor arguments
4. Deploy to World Chain

## 📋 Contract Addresses to Use

### World Chain Sepolia (Testnet)
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`

### World Chain Mainnet
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`

## 🔑 Required Information

### Before Deployment:
1. **Private Key**: Your wallet's private key (keep secure!)
2. **Fee Collector Address**: Your wallet address for collecting marketplace fees
3. **Testnet ETH**: Get from [World Chain Sepolia Faucet](https://www.alchemy.com/faucets/world-chain-sepolia)

### After Deployment:
1. **NFT Contract Address**: Save this address
2. **Marketplace Contract Address**: Save this address
3. **Update Frontend**: Add contract addresses to your frontend

## 🧪 Testing After Deployment

### Test NFT Contract:
1. Mint an NFT
2. Check ownership
3. Test free mint functionality

### Test Marketplace:
1. List an NFT
2. Buy with WLD
3. Buy with GHOSTART
4. Test fee collection

## 🔗 Integration with Frontend

After deployment, update your frontend with the deployed contract addresses:

```javascript
// lib/contracts.js
export const CONTRACTS = {
  NFT_COLLECTION: 'YOUR_DEPLOYED_NFT_ADDRESS',
  MARKETPLACE: 'YOUR_DEPLOYED_MARKETPLACE_ADDRESS',
  WLD_TOKEN: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003',
  GHOSTART_TOKEN: '0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990'
};
```

## 🎯 Recommended Approach

1. **Use Remix IDE** for easy deployment without local setup
2. **Deploy to Sepolia first** for testing
3. **Test all functionality** thoroughly
4. **Deploy to mainnet** when ready
5. **Update frontend** with contract addresses

## 🆘 Troubleshooting

### Common Issues:
1. **Insufficient Gas**: Make sure you have enough ETH for gas fees
2. **Wrong Network**: Ensure you're connected to World Chain Sepolia
3. **Constructor Arguments**: Double-check the order and values
4. **Contract Verification**: Use WorldScan to verify contracts

### Support:
- **World Chain Docs**: https://docs.world.org/world-chain/developers
- **Remix IDE Docs**: https://remix-ide.readthedocs.io
- **Hardhat Docs**: https://hardhat.org/docs

---

## 🚀 Ready to Deploy!

Choose your preferred method above and deploy your smart contracts to World Chain. The Remix IDE method is recommended for ease of use.
