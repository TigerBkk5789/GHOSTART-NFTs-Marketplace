import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export const worldchain = {
  id: 480,
  name: 'World Chain',
  network: 'worldchain',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC || 'https://worldchain-mainnet.g.alchemy.com/public'],
    },
    public: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public'],
    },
  },
  blockExplorers: {
    default: { name: 'Worldscan', url: 'https://worldscan.org' },
  },
} as const;

export const config = createConfig({
  chains: [worldchain],
  transports: {
    [worldchain.id]: http(),
  },
});

export const CONTRACTS = {
  NFT_COLLECTION: process.env.NEXT_PUBLIC_NFT_CONTRACT as `0x${string}`,
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT as `0x${string}`,
  WLD_TOKEN: process.env.NEXT_PUBLIC_WLD_TOKEN as `0x${string}`,
  GHOSTART_TOKEN: process.env.NEXT_PUBLIC_GHOSTART_TOKEN as `0x${string}`,
};
