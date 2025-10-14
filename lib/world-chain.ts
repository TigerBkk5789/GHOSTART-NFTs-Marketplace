import { createConfig } from 'wagmi';
import { worldchain } from 'wagmi/chains';

export const config = createConfig({
  publicClient: () => {
    // Mock public client for now to avoid build issues
    return {} as any;
  },
});

export const CONTRACTS = {
  NFT_COLLECTION: process.env.NEXT_PUBLIC_NFT_CONTRACT as `0x${string}`,
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT as `0x${string}`,
  WLD_TOKEN: process.env.NEXT_PUBLIC_WLD_TOKEN as `0x${string}`,
  GHOSTART_TOKEN: process.env.NEXT_PUBLIC_GHOSTART_TOKEN as `0x${string}`,
};
