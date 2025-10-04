#!/bin/bash

# GHOSTART NFT Marketplace - World Chain Mainnet Deployment Script
# WARNING: This deploys to MAINNET. Make sure you've tested thoroughly on testnet!

set -e

echo "🚀 GHOSTART NFT Marketplace - World Chain MAINNET Deployment"
echo "=========================================================="
echo "⚠️  WARNING: This will deploy to MAINNET!"
echo ""

# Confirm deployment
read -p "Are you sure you want to deploy to World Chain MAINNET? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Check if .env file exists and has mainnet addresses
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    exit 1
fi

source .env

# Check if testnet deployment exists
if [ -z "$NFT_CONTRACT_ADDRESS" ] || [ -z "$MARKETPLACE_CONTRACT_ADDRESS" ]; then
    echo "❌ Please deploy to testnet first and update .env with contract addresses"
    exit 1
fi

echo "📋 Testnet deployment found:"
echo "NFT: $NFT_CONTRACT_ADDRESS"
echo "Marketplace: $MARKETPLACE_CONTRACT_ADDRESS"
echo ""

read -p "Continue with mainnet deployment? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Deploy to World Chain Mainnet
echo "🌍 Deploying to World Chain Mainnet..."

# Deploy NFT contract
echo "📄 Deploying GhostArtNFT to mainnet..."
MAINNET_NFT_ADDRESS=$(forge create src/GhostArtNFT.sol:GhostArtNFT \
  --rpc-url $WORLDCHAIN_MAINNET_RPC \
  --private-key $PRIVATE_KEY \
  --verify \
  --etherscan-api-key $WORLDSCAN_API_KEY \
  --json | jq -r '.deployedTo')

echo "✅ GhostArtNFT deployed at: $MAINNET_NFT_ADDRESS"

# Deploy Marketplace contract
echo "🏪 Deploying GhostArtMarketplace to mainnet..."
MAINNET_MARKETPLACE_ADDRESS=$(forge create src/GhostArtMarketplace.sol:GhostArtMarketplace \
  --rpc-url $WORLDCHAIN_MAINNET_RPC \
  --private-key $PRIVATE_KEY \
  --constructor-args \
    "0x2cFc85d8E48F8EAB294be644d9E25C3030863003" \
    "0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990" \
    "$MAINNET_NFT_ADDRESS" \
    "$FEE_COLLECTOR" \
  --verify \
  --etherscan-api-key $WORLDSCAN_API_KEY \
  --json | jq -r '.deployedTo')

echo "✅ GhostArtMarketplace deployed at: $MAINNET_MARKETPLACE_ADDRESS"

echo ""
echo "🎉 MAINNET Deployment completed successfully!"
echo "==========================================="
echo "Network: World Chain Mainnet"
echo "NFT Contract: $MAINNET_NFT_ADDRESS"
echo "Marketplace Contract: $MAINNET_MARKETPLACE_ADDRESS"
echo ""
echo "🔗 View contracts on WorldScan:"
echo "NFT: https://worldscan.org/address/$MAINNET_NFT_ADDRESS"
echo "Marketplace: https://worldscan.org/address/$MAINNET_MARKETPLACE_ADDRESS"
echo ""
echo "📝 Update your frontend with these mainnet addresses!"


