#!/bin/bash

# GHOSTART NFT Marketplace - World Chain Deployment Script
# This script deploys the smart contracts to World Chain

set -e

echo "🚀 GHOSTART NFT Marketplace - World Chain Deployment"
echo "=================================================="

# Check if Foundry is installed
if ! command -v forge &> /dev/null; then
    echo "❌ Foundry is not installed. Please install it first:"
    echo "   curl -L https://foundry.paradigm.xyz | bash"
    echo "   foundryup"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please copy env.example to .env and fill in your values:"
    echo "   cp env.example .env"
    echo "   # Then edit .env with your private key, fee collector address, and API key"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
if [ -z "$PRIVATE_KEY" ] || [ "$PRIVATE_KEY" = "your_private_key_here" ]; then
    echo "❌ PRIVATE_KEY not set in .env file"
    exit 1
fi

if [ -z "$FEE_COLLECTOR" ] || [ "$FEE_COLLECTOR" = "your_fee_collector_address_here" ]; then
    echo "❌ FEE_COLLECTOR not set in .env file"
    exit 1
fi

if [ -z "$WORLDSCAN_API_KEY" ] || [ "$WORLDSCAN_API_KEY" = "your_worldscan_api_key_here" ]; then
    echo "⚠️  WORLDSCAN_API_KEY not set - contracts will not be verified"
fi

# Install dependencies
echo "📦 Installing dependencies..."
forge install OpenZeppelin/openzeppelin-contracts --no-commit

# Run tests
echo "🧪 Running tests..."
forge test -vvv

# Deploy to World Chain Sepolia Testnet
echo "🌍 Deploying to World Chain Sepolia Testnet..."

# Deploy NFT contract
echo "📄 Deploying GhostArtNFT..."
NFT_ADDRESS=$(forge create src/GhostArtNFT.sol:GhostArtNFT \
  --rpc-url $WORLDCHAIN_SEPOLIA_RPC \
  --private-key $PRIVATE_KEY \
  --verify \
  --etherscan-api-key $WORLDSCAN_API_KEY \
  --json | jq -r '.deployedTo')

echo "✅ GhostArtNFT deployed at: $NFT_ADDRESS"

# Deploy Marketplace contract
echo "🏪 Deploying GhostArtMarketplace..."
MARKETPLACE_ADDRESS=$(forge create src/GhostArtMarketplace.sol:GhostArtMarketplace \
  --rpc-url $WORLDCHAIN_SEPOLIA_RPC \
  --private-key $PRIVATE_KEY \
  --constructor-args \
    "0x2cFc85d8E48F8EAB294be644d9E25C3030863003" \
    "0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990" \
    "$NFT_ADDRESS" \
    "$FEE_COLLECTOR" \
  --verify \
  --etherscan-api-key $WORLDSCAN_API_KEY \
  --json | jq -r '.deployedTo')

echo "✅ GhostArtMarketplace deployed at: $MARKETPLACE_ADDRESS"

# Update .env file with deployed addresses
echo "📝 Updating .env file with deployed addresses..."
sed -i "s/NFT_CONTRACT_ADDRESS=.*/NFT_CONTRACT_ADDRESS=$NFT_ADDRESS/" .env
sed -i "s/MARKETPLACE_CONTRACT_ADDRESS=.*/MARKETPLACE_CONTRACT_ADDRESS=$MARKETPLACE_ADDRESS/" .env

echo ""
echo "🎉 Deployment completed successfully!"
echo "=================================="
echo "Network: World Chain Sepolia"
echo "NFT Contract: $NFT_ADDRESS"
echo "Marketplace Contract: $MARKETPLACE_ADDRESS"
echo "WLD Token: 0x2cFc85d8E48F8EAB294be644d9E25C3030863003"
echo "GHOSTART Token: 0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990"
echo "Fee Collector: $FEE_COLLECTOR"
echo ""
echo "📋 Next steps:"
echo "1. Test the contracts on Sepolia testnet"
echo "2. Update your frontend with the contract addresses"
echo "3. Deploy to mainnet when ready"
echo ""
echo "🔗 View contracts on WorldScan:"
echo "NFT: https://worldscan.org/address/$NFT_ADDRESS"
echo "Marketplace: https://worldscan.org/address/$MARKETPLACE_ADDRESS"


