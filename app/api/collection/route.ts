import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch collection stats from blockchain or database
  const stats = {
    totalSupply: 10000,
    minted: 3247,
    floorPrice: 0.5,
    volume24h: 127.5,
    holders: 892,
    listings: 234,
  };

  return NextResponse.json(stats);
}
