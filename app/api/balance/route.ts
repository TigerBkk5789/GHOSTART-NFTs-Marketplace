import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    // Fetch WLD balance
    const wldResponse = await fetch(process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: process.env.NEXT_PUBLIC_WLD_TOKEN,
            data: '0x70a08231000000000000000000000000' + address.slice(2).padStart(40, '0'),
          },
          'latest',
        ],
        id: 1,
      }),
    });

    const wldData = await wldResponse.json();

    // Fetch GHOSTART balance
    const ghostResponse = await fetch(process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: process.env.NEXT_PUBLIC_GHOSTART_TOKEN,
            data: '0x70a08231000000000000000000000000' + address.slice(2).padStart(40, '0'),
          },
          'latest',
        ],
        id: 2,
      }),
    });

    const ghostData = await ghostResponse.json();

    return NextResponse.json({
      wld: wldData.result ? parseInt(wldData.result, 16) / 1e18 : 0,
      ghostart: ghostData.result ? parseInt(ghostData.result, 16) / 1e18 : 0,
    });
  } catch (error) {
    console.error('Balance fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch balances' }, { status: 500 });
  }
}
