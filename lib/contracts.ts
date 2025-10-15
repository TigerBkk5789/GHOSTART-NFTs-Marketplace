export const GHOSTART_NFT_ABI = [
  // ERC721 Standard Functions
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'uri', type: 'string' }
    ],
    name: 'mintNFT',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'approved', type: 'bool' }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

export const MARKETPLACE_ABI = [
  {
    inputs: [
      { name: 'nftContract', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'priceWLD', type: 'uint256' }
    ],
    name: 'listNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'listingId', type: 'uint256' }],
    name: 'buyWithWLD',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ name: 'listingId', type: 'uint256' }],
    name: 'cancelListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'listingId', type: 'uint256' }],
    name: 'getListing',
    outputs: [
      { name: 'seller', type: 'address' },
      { name: 'nftContract', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'price', type: 'uint256' },
      { name: 'active', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllListings',
    outputs: [
      {
        name: 'listings',
        type: 'tuple[]',
        components: [
          { name: 'id', type: 'uint256' },
          { name: 'seller', type: 'address' },
          { name: 'nftContract', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
          { name: 'price', type: 'uint256' },
          { name: 'active', type: 'bool' }
        ]
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

// World Chain Bridge ABI
export const BRIDGE_ABI = [
  {
    inputs: [
      { name: 'l2Token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'minGasLimit', type: 'uint32' },
      { name: 'extraData', type: 'bytes' }
    ],
    name: 'bridgeERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'l2Token', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'minGasLimit', type: 'uint32' },
      { name: 'extraData', type: 'bytes' }
    ],
    name: 'bridgeERC20To',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'l2Token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'minGasLimit', type: 'uint32' },
      { name: 'extraData', type: 'bytes' }
    ],
    name: 'bridgeERC20WithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

export const CONTRACTS = {
  // Main Contracts
  NFT: process.env.NEXT_PUBLIC_NFT_CONTRACT as `0x${string}`,
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT as `0x${string}`,
  WLD: process.env.NEXT_PUBLIC_WLD_TOKEN as `0x${string}`,
  GHOSTART: process.env.NEXT_PUBLIC_GHOSTART_TOKEN as `0x${string}`,
  
  // World Chain Bridge
  BRIDGE: process.env.NEXT_PUBLIC_BRIDGE_CONTRACT as `0x${string}`,
  
  // World Chain Configuration
  WORLD_CHAIN: {
    RPC: process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC,
    SEPOLIA_RPC: process.env.NEXT_PUBLIC_WORLD_CHAIN_SEPOLIA_RPC,
    CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '480'),
    SEPOLIA_CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_SEPOLIA_CHAIN_ID || '480'),
  },
  
  // OP Stack Configuration
  OP_STACK: {
    L1_RPC: process.env.NEXT_PUBLIC_OP_STACK_L1_RPC,
    L2_RPC: process.env.NEXT_PUBLIC_OP_STACK_L2_RPC,
  },
  
  // World Mini App Configuration
  MINI_APP: {
    APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    API_KEY: process.env.WORLD_APP_API_KEY,
    WORLD_ID_APP_ID: process.env.NEXT_PUBLIC_WORLD_ID_APP_ID,
    WORLD_ID_ACTION: process.env.NEXT_PUBLIC_WORLD_ID_ACTION,
  },
  
  // IPFS Configuration
  IPFS: {
    GATEWAY: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
    PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY,
    PINATA_SECRET: process.env.NEXT_PUBLIC_PINATA_SECRET,
  }
};