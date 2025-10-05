import { http, createConfig } from 'wagmi';
import { worldchain } from 'wagmi/chains';

export const config = createConfig({
  chains: [worldchain],
  transports: {
    [worldchain.id]: http(process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC),
  },
});

export const CONTRACTS = {
  NFT_COLLECTION: process.env.NEXT_PUBLIC_NFT_CONTRACT as `0x${string}`,
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT as `0x${string}`,
  WLD_TOKEN: process.env.NEXT_PUBLIC_WLD_TOKEN as `0x${string}`,
  GHOSTART_TOKEN: process.env.NEXT_PUBLIC_GHOSTART_TOKEN as `0x${string}`,
};

export const GHOSTART_TO_WLD = 0.000009;
