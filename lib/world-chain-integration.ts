import { CONTRACTS } from './contracts';

// World Chain Integration Utilities
export class WorldChainIntegration {
  private static instance: WorldChainIntegration;
  
  public static getInstance(): WorldChainIntegration {
    if (!WorldChainIntegration.instance) {
      WorldChainIntegration.instance = new WorldChainIntegration();
    }
    return WorldChainIntegration.instance;
  }

  // World ID Verification
  async verifyWorldID(proof: any, action: string = CONTRACTS.MINI_APP.WORLD_ID_ACTION || 'ghostart-nft-mint'): Promise<boolean> {
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proof,
          action,
          app_id: CONTRACTS.MINI_APP.WORLD_ID_APP_ID,
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('World ID verification failed:', error);
      return false;
    }
  }

  // Bridge tokens from Ethereum to World Chain
  async bridgeToWorldChain(
    tokenAddress: string,
    amount: string,
    recipient?: string
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      const bridgeData = {
        l2Token: tokenAddress,
        amount: amount,
        minGasLimit: 200000,
        extraData: '0x',
        ...(recipient && { to: recipient })
      };

      // This would integrate with the actual bridge contract
      // For now, we'll simulate the transaction
      return {
        success: true,
        txHash: '0x' + Math.random().toString(16).substr(2, 64)
      };
    } catch (error) {
      console.error('Bridge transaction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get World Chain balance
  async getWorldChainBalance(address: string, tokenAddress?: string): Promise<string> {
    try {
      const response = await fetch('/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          tokenAddress: tokenAddress || CONTRACTS.WLD,
          chainId: CONTRACTS.WORLD_CHAIN.CHAIN_ID
        }),
      });

      const result = await response.json();
      return result.balance || '0';
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return '0';
    }
  }

  // Mint NFT on World Chain
  async mintNFT(
    to: string,
    metadataURI: string,
    worldIDProof?: any
  ): Promise<{ success: boolean; tokenId?: string; txHash?: string; error?: string }> {
    try {
      // Verify World ID if proof provided
      if (worldIDProof) {
        const verified = await this.verifyWorldID(worldIDProof);
        if (!verified) {
          return {
            success: false,
            error: 'World ID verification failed'
          };
        }
      }

      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          metadataURI,
          worldIDProof
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('NFT minting failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // List NFT on marketplace
  async listNFT(
    nftContract: string,
    tokenId: string,
    price: string
  ): Promise<{ success: boolean; listingId?: string; txHash?: string; error?: string }> {
    try {
      const response = await fetch('/api/marketplace/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nftContract,
          tokenId,
          price
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('NFT listing failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Buy NFT from marketplace
  async buyNFT(
    listingId: string,
    price: string
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      const response = await fetch('/api/marketplace/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId,
          price
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('NFT purchase failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get marketplace listings
  async getMarketplaceListings(): Promise<any[]> {
    try {
      const response = await fetch('/api/marketplace/listings');
      const result = await response.json();
      return result.listings || [];
    } catch (error) {
      console.error('Failed to fetch marketplace listings:', error);
      return [];
    }
  }

  // Upload metadata to IPFS
  async uploadToIPFS(metadata: any): Promise<string> {
    try {
      const response = await fetch('/api/ipfs/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      });

      const result = await response.json();
      return result.ipfsHash;
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw error;
    }
  }

  // Get user's NFTs
  async getUserNFTs(address: string): Promise<any[]> {
    try {
      const response = await fetch(`/api/nfts?owner=${address}`);
      const result = await response.json();
      return result.nfts || [];
    } catch (error) {
      console.error('Failed to fetch user NFTs:', error);
      return [];
    }
  }

  // Send notification via World Mini App
  async sendNotification(
    userId: string,
    title: string,
    message: string,
    action?: string
  ): Promise<boolean> {
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title,
          message,
          action
        }),
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }
}

// Export singleton instance
export const worldChain = WorldChainIntegration.getInstance();
