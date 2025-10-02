"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Rocket, BookOpen, DollarSign, Zap, Shield, ExternalLink, Wallet, Smartphone } from "lucide-react"
import Link from "next/link"

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            <Code className="h-3 w-3 mr-1" />
            World Chain Documentation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Developer Resources</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build on World Chain - from smart contract deployment to grants and technical
            specifications
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="deployment" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8 h-auto">
            <TabsTrigger value="deployment" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Deploy Contracts
            </TabsTrigger>
            <TabsTrigger value="miniapps" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mini Apps
            </TabsTrigger>
            <TabsTrigger value="fees" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Transaction Fees
            </TabsTrigger>
            <TabsTrigger value="bridges" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Bridges
            </TabsTrigger>
            <TabsTrigger value="paymasters" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Paymasters
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Contract Addresses
            </TabsTrigger>
            <TabsTrigger value="evm" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              EVM Equivalence
            </TabsTrigger>
            <TabsTrigger value="grants" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Grants Program
            </TabsTrigger>
          </TabsList>

          {/* Deploy Contracts Tab */}
          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Deploy Smart Contracts to World Chain
                </CardTitle>
                <CardDescription>
                  Learn how to deploy smart contracts using Foundry and Solidity on World Chain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Install Foundry CLI</h3>
                  <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
                    curl -L https://foundry.paradigm.xyz | bash
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">2. Create a Foundry Project</h3>
                  <div className="bg-secondary p-4 rounded-lg font-mono text-sm">
                    forge init hello-world-chain && cd hello-world-chain
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">3. Write Your Smart Contract</h3>
                  <p className="text-muted-foreground">
                    Create a new file called HelloWorldChain.sol in the /src directory:
                  </p>
                  <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWorldChain {
    string private word;

    constructor() {
        word = "Hello World Chain!";
    }

    function setWord(string memory newWord) public {
        word = newWord;
    }

    function getWord() public view returns (string memory) {
        return word;
    }
}`}</pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">4. Compile the Contract</h3>
                  <div className="bg-secondary p-4 rounded-lg font-mono text-sm">forge build</div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">5. Generate a Wallet</h3>
                  <div className="bg-secondary p-4 rounded-lg font-mono text-sm">cast wallet new</div>
                  <Alert>
                    <AlertDescription>
                      Never share your private key with anyone. Always use best practices for private key management.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">6. Fund Your Wallet</h3>
                  <p className="text-muted-foreground">Get World Chain Sepolia ETH from the Alchemy faucet:</p>
                  <Button asChild>
                    <Link
                      href="https://www.alchemy.com/faucets/world-chain-sepolia"
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      Get Testnet ETH
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">7. Deploy to World Chain Sepolia</h3>
                  <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`forge create src/HelloWorldChain.sol:HelloWorldChain \\
  --rpc-url https://worldchain-sepolia.g.alchemy.com/public \\
  --private-key YOUR_PRIVATE_KEY`}</pre>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link href="https://book.getfoundry.sh/" target="_blank" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Foundry Docs
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link
                      href="https://docs.soliditylang.org/en/v0.8.28/"
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Solidity Docs
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transaction Fees Tab */}
          <TabsContent value="fees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Transaction Fees on World Chain
                </CardTitle>
                <CardDescription>Understanding L2 execution fees and L1 security fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Fee Structure</h3>
                  <p className="text-muted-foreground">Every World Chain transaction consists of two costs:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">L2 Execution Fee</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          The cost to execute your transaction on the L2 network. This fee varies based on network
                          demand.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">L1 Security Fee</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Covers the estimated cost of publishing the transaction on Ethereum L1. Typically higher than
                          L2 fees.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cost Optimization Tips</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Submit transactions during periods of lower gas fees on L1 (e.g., weekends) to save on L1
                        security fees
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use services like GasHawk to schedule transactions during low-demand periods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>L2 fees adjust dynamically based on network congestion, similar to Ethereum EIP-1559</span>
                    </li>
                  </ul>
                </div>

                <Alert>
                  <AlertDescription>
                    For detailed fee calculations, refer to the{" "}
                    <Link
                      href="https://docs.optimism.io/stack/transactions/fees"
                      target="_blank"
                      className="text-primary hover:underline"
                    >
                      OP Stack documentation
                    </Link>
                    .
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bridges Tab */}
          <TabsContent value="bridges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Bridges for World Chain
                </CardTitle>
                <CardDescription>Transfer assets between World Chain and other blockchain networks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Superchain Bridges */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Superchain Bridges</h3>
                  <p className="text-muted-foreground">
                    The Superchain bridge is the native bridge for World Chain as it comes with the OP Stack smart
                    contracts which power the network. There are several interface providers for this bridge.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Superbridge Core</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          A blockchain bridging platform that enables users to transfer Ethereum (ETH) and ERC20 tokens
                          between different blockchain networks, primarily focusing on OP Stack Layer 2 rollups chains
                          including World Chain.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href="https://superbridge.app/world-chain"
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            Visit Superbridge
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Alchemy Bridge</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          The native bridge interface for World Chain mainnet provided by Alchemy, the rollup as a
                          service (RaaS) provider for World Chain. Includes both mainnet and testnet bridges.
                        </p>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link
                              href="https://worldchain-mainnet.bridge.alchemy.com/"
                              target="_blank"
                              className="flex items-center gap-2"
                            >
                              Mainnet
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link
                              href="https://worldchain-sepolia.bridge.alchemy.com/"
                              target="_blank"
                              className="flex items-center gap-2"
                            >
                              Testnet
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Third-party Bridges */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Third-party Bridges</h3>
                  <Alert>
                    <AlertDescription>
                      <strong>Recommended:</strong> Across is the recommended provider for bridging WLD between World
                      Chain and other networks.
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          Across
                          <Badge variant="secondary" className="text-xs">
                            Recommended
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          An intent-based cross-chain bridging protocol that allows users to transfer tokens between
                          different blockchain networks, particularly focusing on Layer 2 solutions and
                          Ethereum-compatible chains.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href="https://app.across.to/bridge?"
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            Visit Across
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Brid.gg</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Facilitates cross-chain transactions and aims to improve interoperability between different
                          blockchain networks. Primarily connects Ethereum Mainnet to OP Chains including World Chain.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link href="https://brid.gg/" target="_blank" className="flex items-center gap-2">
                            Visit Brid.gg
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Superbridge Fast</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          A service offered by Superbridge that allows users to deposit and withdraw assets to and from
                          World Chain quickly using third party bridges like Synapse, Across, and Hyperlane. This is the
                          fastest way to bridge assets.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link href="https://superbridge.app/fast" target="_blank" className="flex items-center gap-2">
                            Visit Superbridge Fast
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Synapse</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          A cross-chain communication protocol that enables seamless asset transfers and messaging
                          across different blockchain networks. Provides secure infrastructure for interoperability
                          without centralized intermediaries.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link href="https://synapseprotocol.com/" target="_blank" className="flex items-center gap-2">
                            Visit Synapse
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Hyperlane</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          An innovative interoperability protocol designed to facilitate seamless cross-chain
                          communication. Provides permissionless infrastructure for sending arbitrary data between
                          blockchains.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link href="https://hyperlane.xyz/" target="_blank" className="flex items-center gap-2">
                            Visit Hyperlane
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">LayerZero</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          An omnichain interoperability protocol that enables seamless communication between different
                          blockchains. Supports cross-chain messaging and asset transfers.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link href="https://layerzero.network/" target="_blank" className="flex items-center gap-2">
                            Visit LayerZero
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Chainlink CCIP</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          A blockchain interoperability protocol that enables developers to build secure applications
                          that can transfer tokens, messages (data), or both tokens and messages across chains.
                        </p>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link
                              href="https://chain.link/cross-chain"
                              target="_blank"
                              className="flex items-center gap-2"
                            >
                              Visit CCIP
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm">
                            <Link
                              href="https://docs.chain.link/ccip/directory/mainnet/chain/ethereum-mainnet-worldchain-1"
                              target="_blank"
                              className="flex items-center gap-2"
                            >
                              Docs
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Thirdweb Universal Bridge</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          A comprehensive Web3 payment solution that allows your users to onramp, bridge, and swap on
                          any EVM chain with any EVM token or fiat, thanks to its automatic cross-chain routing.
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href="https://portal.thirdweb.com/connect/pay/overview"
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            Visit Thirdweb
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Liquidity Layers */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Liquidity Layers</h3>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cortex Protocol</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        A decentralized, non-custodial liquidity protocol built on Ethereum that enables users to lend
                        and borrow crypto assets. Designed to provide a secure and efficient platform for decentralized
                        finance (DeFi) activities.
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link href="https://cortexprotocol.com/" target="_blank" className="flex items-center gap-2">
                          Visit Cortex Protocol
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="miniapps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  World ID Verify Command
                </CardTitle>
                <CardDescription>
                  Use incognito actions to gate functionality behind unique human verification in your mini app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The verify command lets you use incognito actions inside of your mini app. Incognito actions are a
                    primitive of World ID and allow you to gate functionality behind a unique human check.
                  </p>
                  <Alert>
                    <AlertDescription>
                      First create an incognito action in the{" "}
                      <Link
                        href="https://developer.worldcoin.org/"
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        Developer Portal
                      </Link>
                      .
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Use Case</h3>
                  <p className="text-muted-foreground">
                    This command is crucial for applications that require user verification to access certain features,
                    ensuring that only verified humans can perform actions. You can set up the incognito action limiting
                    the number of times a user can perform an action.
                  </p>
                  <Card className="bg-secondary/50">
                    <CardContent className="pt-6">
                      <p className="text-sm">
                        <strong>Example:</strong> A game that requires users to verify their identity before playing to
                        have a bot-free experience.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Implementation Approaches</h3>
                  <p className="text-muted-foreground">
                    MiniKit provides two ways to implement verification: async handlers (recommended) and event
                    listeners.
                  </p>

                  <Tabs defaultValue="async" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="async">Async Handlers</TabsTrigger>
                      <TabsTrigger value="events">Event Listeners</TabsTrigger>
                    </TabsList>

                    <TabsContent value="async" className="space-y-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Input Payload</h4>
                        <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`export type VerifyCommandInput = {
  action: string
  signal?: string
  verification_level?: VerificationLevel // Default: Orb
}`}</pre>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Success Payload</h4>
                        <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`type MiniAppVerifyActionSuccessPayload = {
  status: 'success'
  proof: string
  merkle_root: string
  nullifier_hash: string
  verification_level: VerificationLevel
  version: number
}`}</pre>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Frontend Implementation</h4>
                        <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'

const verifyPayload: VerifyCommandInput = {
  action: 'voting-action', // This is your action ID from the Developer Portal
  signal: '0x12312', // Optional additional data
  verification_level: VerificationLevel.Orb, // Orb | Device
}

const handleVerify = async () => {
  if (!MiniKit.isInstalled()) {
    return
  }
  
  // World App will open a drawer prompting the user to confirm the operation
  const {finalPayload} = await MiniKit.commandsAsync.verify(verifyPayload)
  
  if (finalPayload.status === 'error') {
    return console.log('Error payload', finalPayload)
  }

  // Verify the proof in the backend
  const verifyResponse = await fetch('/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload: finalPayload as ISuccessResult,
      action: 'voting-action',
      signal: '0x12312', // Optional
    }),
  })

  const verifyResponseJson = await verifyResponse.json()
  if (verifyResponseJson.status === 200) {
    console.log('Verification success!')
  }
}`}</pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="events" className="space-y-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Sending the Command</h4>
                        <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`import { MiniKit, VerifyCommandInput, VerificationLevel } from '@worldcoin/minikit-js'

const verifyPayload: VerifyCommandInput = {
  action: 'voting-action',
  signal: '0x12312',
  verification_level: VerificationLevel.Orb,
}

const payload = MiniKit.commands.verify(verifyPayload)`}</pre>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Listening for the Response</h4>
                        <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`import { MiniKit, ResponseEvent, ISuccessResult, MiniAppVerifyActionPayload } from '@worldcoin/minikit-js'

useEffect(() => {
  if (!MiniKit.isInstalled()) {
    return
  }

  MiniKit.subscribe(ResponseEvent.MiniAppVerifyAction, async (response: MiniAppVerifyActionPayload) => {
    if (response.status === 'error') {
      return console.log('Error payload', response)
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: response as ISuccessResult,
        action: 'voting-action',
        signal: '0x12312',
      }),
    })

    const verifyResponseJson = await verifyResponse.json()
    if (verifyResponseJson.status === 200) {
      console.log('Verification success!')
    }
  })

  return () => {
    MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction)
  }
}, [])`}</pre>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Backend Verification</h3>
                  <Alert variant="destructive">
                    <AlertDescription>
                      <strong>Important:</strong> You should pass the proof to your backend when verifying proofs via
                      the API. Users can manipulate information in the frontend, so the proof must be verified in a
                      trusted environment.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Backend Route Implementation</h4>
                    <div className="bg-secondary p-4 rounded-lg font-mono text-xs overflow-x-auto">
                      <pre>{`import { NextRequest, NextResponse } from 'next/server'
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/minikit-js'

interface IRequestPayload {
  payload: ISuccessResult
  action: string
  signal: string | undefined
}

export async function POST(req: NextRequest) {
  const { payload, action, signal } = (await req.json()) as IRequestPayload
  const app_id = process.env.APP_ID as \`app_\${string}\`
  const verifyRes = (await verifyCloudProof(payload, app_id, action, signal)) as IVerifyResponse

  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    return NextResponse.json({ verifyRes, status: 200 })
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    return NextResponse.json({ verifyRes, status: 400 })
  }
}`}</pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Success Result on World App</h3>
                  <p className="text-muted-foreground">
                    If implemented correctly, the user will see a verification drawer in World App prompting them to
                    confirm the operation.
                  </p>
                  <Card className="bg-secondary/50">
                    <CardContent className="pt-6 flex justify-center">
                      <video className="rounded-lg border" width="300" autoPlay muted loop playsInline>
                        <source
                          src="https://mintcdn.com/tfh/QgV5KXRTJlR7G1Sc/images/docs/mini-apps/commands/verify-command.mp4?fit=max&auto=format&n=QgV5KXRTJlR7G1Sc&q=85&s=0ba2707f8334750e798e0400a4a72d94"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link href="https://developer.worldcoin.org/" target="_blank" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Developer Portal
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link
                      href="https://docs.worldcoin.org/world-id/id/cloud"
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Incognito Actions Docs
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paymasters Tab */}
          <TabsContent value="paymasters" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Paymasters for World Chain
                </CardTitle>
                <CardDescription>
                  Abstract away gas fees and enable flexible payment options for your users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Paymasters are smart contracts that enable decentralized applications to implement flexible gas
                    policies, including sponsoring gas fees for users or accepting gas payments in ERC-20 tokens instead
                    of native blockchain currency.
                  </p>
                </div>

                {/* Alchemy Paymasters */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Alchemy Paymasters</CardTitle>
                      <CardDescription>Flexible gas policies for your dApp</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Alchemy Paymasters are smart contracts that enable decentralized applications (dApps) to
                        implement flexible gas policies, including:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Sponsoring gas fees for users to improve onboarding and user experience</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>
                            Accepting gas payments in ERC-20 tokens instead of native blockchain currency (ETH)
                          </span>
                        </li>
                      </ul>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">World Chain</Badge>
                        <Badge variant="secondary">World Chain Sepolia</Badge>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link
                          href="https://www.alchemy.com/overviews/what-is-a-paymaster"
                          target="_blank"
                          className="flex items-center gap-2"
                        >
                          Learn More
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Pimlico */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pimlico</CardTitle>
                      <CardDescription>Account abstraction infrastructure with paymasters and bundlers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Pimlico provides account abstraction infrastructure including paymasters and bundlers. They
                        offer two types of paymasters to abstract away gas fees for users in the ERC-4337 ecosystem:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Verifying Paymaster</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm text-muted-foreground">
                            Allows developers to sponsor on-chain gas fees for users. Utilizes an off-chain Pimlico
                            balance loaded through a dashboard.
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">ERC-20 Paymaster</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm text-muted-foreground">
                            A permissionless on-chain smart contract that enables users to pay gas fees using their
                            ERC-20 tokens. Operates without requiring developer intervention.
                          </CardContent>
                        </Card>
                      </div>

                      <Alert>
                        <AlertDescription>
                          Pimlico's paymasters can be seamlessly integrated with{" "}
                          <Link
                            href="https://docs.pimlico.io/permissionless"
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            permissionless.js
                          </Link>
                          , a TypeScript library built on viem for ERC-4337 development.
                        </AlertDescription>
                      </Alert>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">World Chain</Badge>
                        <Badge variant="secondary">World Chain Sepolia</Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href="https://pimlico.io/" target="_blank" className="flex items-center gap-2">
                            Visit Pimlico
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href="https://docs.pimlico.io/infra/paymaster"
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            Paymaster Docs
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href="https://docs.pimlico.io/infra/bundler"
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            Bundler Docs
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Thirdweb */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Thirdweb</CardTitle>
                      <CardDescription>ERC-4337 compliant smart contract accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Not only does Thirdweb provide developer tools, but they also have ERC-4337 compliant smart
                        contract accounts with role-based permission control. They offer two main types:
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Simple Smart Accounts</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm text-muted-foreground">
                            Lightweight smart contract accounts for basic account abstraction needs with minimal
                            overhead.
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Managed Smart Accounts</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm text-muted-foreground">
                            Advanced smart contract accounts with role-based permission control and additional features
                            for complex use cases.
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">World Chain</Badge>
                        <Badge variant="secondary">World Chain Sepolia</Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href="https://thirdweb.com/" target="_blank" className="flex items-center gap-2">
                            Visit Thirdweb
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link
                            href="https://portal.thirdweb.com/contracts/build/base-contracts/erc-4337"
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            Smart Accounts Docs
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contract Addresses Tab */}
          <TabsContent value="contracts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  World Chain Contract Addresses
                </CardTitle>
                <CardDescription>Official smart contract addresses for World Chain networks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* World Chain Mainnet */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">World Chain Mainnet</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Contract Name</th>
                          <th className="p-2 text-left">Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2">L2CrossDomainMessenger</td>
                          <td className="p-2 font-mono text-xs">0x4200000000000000000000000000000000000007</td>
                        </tr>
                        <tr>
                          <td className="p-2">L2StandardBridge</td>
                          <td className="p-2 font-mono text-xs">0x4200000000000000000000000000000000000010</td>
                        </tr>
                        <tr>
                          <td className="p-2">L2ERC721Bridge</td>
                          <td className="p-2 font-mono text-xs">0x4200000000000000000000000000000000000014</td>
                        </tr>
                        <tr>
                          <td className="p-2">GasPriceOracle</td>
                          <td className="p-2 font-mono text-xs">0x420000000000000000000000000000000000000F</td>
                        </tr>
                        <tr>
                          <td className="p-2">EAS</td>
                          <td className="p-2 font-mono text-xs">0x4200000000000000000000000000000000000021</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="https://worldscan.org" target="_blank" className="flex items-center gap-2">
                      View on Worldscan
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>

                {/* Ethereum Mainnet */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ethereum Mainnet</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Contract Name</th>
                          <th className="p-2 text-left">Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2">L1CrossDomainMessengerProxy</td>
                          <td className="p-2 font-mono text-xs">0xf931a81D18B1766d15695ffc7c1920a62b7e710a</td>
                        </tr>
                        <tr>
                          <td className="p-2">L1StandardBridgeProxy</td>
                          <td className="p-2 font-mono text-xs">0x470458C91978D2d929704489Ad730DC3E3001113</td>
                        </tr>
                        <tr>
                          <td className="p-2">OptimismPortalProxy</td>
                          <td className="p-2 font-mono text-xs">0xd5ec14a83B7d95BE1E2Ac12523e2dEE12Cbeea6C</td>
                        </tr>
                        <tr>
                          <td className="p-2">SystemConfigProxy</td>
                          <td className="p-2 font-mono text-xs">0x6ab0777fD0e609CE58F939a7F70Fe41F5Aa6300A</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="https://etherscan.io" target="_blank" className="flex items-center gap-2">
                      View on Etherscan
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>

                {/* World Chain Sepolia */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">World Chain Sepolia Testnet</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Contract Name</th>
                          <th className="p-2 text-left">Address</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2">L2CrossDomainMessenger</td>
                          <td className="p-2 font-mono text-xs">0x4200000000000000000000000000000000000007</td>
                        </tr>
                        <tr>
                          <td className="p-2">L2StandardBridge</td>
                          <td className="p-2 font-mono text-xs">0x4200000000000000000000000000000000000010</td>
                        </tr>
                        <tr>
                          <td className="p-2">GasPriceOracle</td>
                          <td className="p-2 font-mono text-xs">0x420000000000000000000000000000000000000F</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href="https://worldchain-sepolia.explorer.alchemy.com"
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      View on Blockscout
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EVM Equivalence Tab */}
          <TabsContent value="evm" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  EVM Equivalence
                </CardTitle>
                <CardDescription>
                  World Chain is EVM-equivalent through the OP Stack, ensuring full Ethereum compatibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    World Chain utilizes the OP Stack, a modular framework developed by Optimism, which ensures
                    compatibility with the Ethereum Virtual Machine (EVM). This means you can execute smart contracts
                    and interact with dApps designed for Ethereum without any modifications.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Differences from Ethereum</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Parameter</th>
                          <th className="p-2 text-left">World Chain</th>
                          <th className="p-2 text-left">OP Mainnet</th>
                          <th className="p-2 text-left">Ethereum</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2">Block time (seconds)</td>
                          <td className="p-2 font-semibold">2</td>
                          <td className="p-2">2</td>
                          <td className="p-2">12</td>
                        </tr>
                        <tr>
                          <td className="p-2">Block gas limit</td>
                          <td className="p-2 font-semibold">30,000,000</td>
                          <td className="p-2">30,000,000</td>
                          <td className="p-2">30,000,000</td>
                        </tr>
                        <tr>
                          <td className="p-2">Block gas target</td>
                          <td className="p-2 font-semibold">10,000,000</td>
                          <td className="p-2">5,000,000</td>
                          <td className="p-2">15,000,000</td>
                        </tr>
                        <tr>
                          <td className="p-2">EIP-1559 elasticity multiplier</td>
                          <td className="p-2 font-semibold">6</td>
                          <td className="p-2">6</td>
                          <td className="p-2">2</td>
                        </tr>
                        <tr>
                          <td className="p-2">Max base fee increase (per block)</td>
                          <td className="p-2 font-semibold">0.8%</td>
                          <td className="p-2">2%</td>
                          <td className="p-2">12.5%</td>
                        </tr>
                        <tr>
                          <td className="p-2">Max base fee decrease (per block)</td>
                          <td className="p-2 font-semibold">0.4%</td>
                          <td className="p-2">0.4%</td>
                          <td className="p-2">12.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    World Chain's faster block times (2 seconds vs 12 seconds) enable quicker transaction confirmations
                    while maintaining full EVM compatibility.
                  </AlertDescription>
                </Alert>

                <Button asChild variant="outline">
                  <Link href="https://docs.optimism.io/stack/getting-started" target="_blank">
                    Learn More About OP Stack
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grants Program Tab */}
          <TabsContent value="grants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Human Collective Grants Program
                </CardTitle>
                <CardDescription>
                  Get funding to build on World Chain and accelerate the Worldcoin Tech Tree
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The Worldcoin Foundation runs the Human Collective Grants program, which provides funding to
                    builders accelerating the Worldcoin Tech Tree. The program operates on a continuous basis - you can
                    apply at any time.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Areas of Interest</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Infrastructure</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>• Rustification of the OP Stack</p>
                        <p>• Gigagas roadmap advancement</p>
                        <p>• ZK-ifying the OP Stack</p>
                        <p>• L2 execution client development</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Innovation</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>• Priority blockspace for humans</p>
                        <p>• Separate EIP-1559 fee market</p>
                        <p>• Digital identity experiments</p>
                        <p>• Scalability research</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Applications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>• Proof aggregators (like Nebra)</p>
                        <p>• Storage proofs (Herodotus, Axiom)</p>
                        <p>• Passkeys modules for Safe</p>
                        <p>• Innovative dApps on World Chain</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">UX & Interoperability</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>• Improving user experience</p>
                        <p>• Cross-chain interoperability</p>
                        <p>• Developer tooling</p>
                        <p>• Chain-level experiments</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">How to Apply</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1">
                      <Link
                        href="https://airtable.com/appftNMpv819abvTc/pag0uKCtjQAPJgaEB/form"
                        target="_blank"
                        className="flex items-center justify-center gap-2"
                      >
                        Apply for Grant
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <Link href="mailto:grants@worldcoin.org" className="flex items-center justify-center gap-2">
                        Email Us
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    The grants program switched from quarterly waves to a continuous format. You can now apply at any
                    time throughout the year.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>Helpful links and community channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="https://world.org/tech-tree" target="_blank" className="flex flex-col items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Tech Tree</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link
                  href="https://t.me/worldcoindevelopers"
                  target="_blank"
                  className="flex flex-col items-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Telegram</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 bg-transparent">
                <Link href="https://world.org/discord" target="_blank" className="flex flex-col items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  <span>Discord</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
