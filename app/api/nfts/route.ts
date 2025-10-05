import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch NFTs from blockchain or database
    // For now, return mock data with GHOSTART-themed NFTs
    const nfts = [
      {
        id: 1,
        tokenId: 1,
        name: 'Cosmic Ghost #001',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&h=500&fit=crop',
        priceWLD: 100,
        priceGHOSTART: 11111111,
        creator: '0x1234...5678',
        owner: '0x1234...5678',
        likes: 42,
        chain: 'World Chain',
      },
      {
        id: 2,
        tokenId: 2,
        name: 'Flaming Skull #002',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&h=500&fit=crop',
        priceWLD: 150,
        priceGHOSTART: 16666666,
        creator: '0x1234...5678',
        owner: '0x1234...5678',
        likes: 67,
        chain: 'World Chain',
      },
      {
        id: 3,
        tokenId: 3,
        name: 'Ethereal Spirit #003',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&h=500&fit=crop',
        priceWLD: 200,
        priceGHOSTART: 22222222,
        creator: '0x1234...5678',
        owner: '0x1234...5678',
        likes: 89,
        chain: 'World Chain',
      },
    ];

    return NextResponse.json(nfts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
