'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/ghostart-cryptocurrency-coin-logo.jpg"
              alt="GHOSTART"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold">GHOSTART</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/collection" className="hover:text-blue-600 font-medium">
              Collection
            </Link>
            <Link href="/marketplace" className="hover:text-blue-600 font-medium">
              Marketplace
            </Link>
            <Link href="/wallet" className="hover:text-blue-600 font-medium">
              My Wallet
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/wallet"
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100"
                >
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Link>
                <button
                  onClick={() => disconnect()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 flex items-center space-x-2"
              >
                <Wallet size={20} />
                <span>Connect</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <Link href="/collection" className="block py-2 hover:text-blue-600">
              Collection
            </Link>
            <Link href="/marketplace" className="block py-2 hover:text-blue-600">
              Marketplace
            </Link>
            <Link href="/wallet" className="block py-2 hover:text-blue-600">
              My Wallet
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
