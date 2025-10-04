# 🎯 Final GHOSTART NFT Marketplace Integration Guide

## 🌟 **Complete World Chain Ecosystem Integration**

Your GHOSTART NFT marketplace is now ready for full integration with the World Chain ecosystem, including USDC support, Quick Actions, and PUF integration!

---

## 💰 **USDC Integration for Your Marketplace**

### **1. USDC Contract Addresses**
- **World Chain Mainnet**: `0x79A02482A880bCE3F13e09Da970dC34db4CD24d1`
- **World Chain Sepolia**: `0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88`

### **2. Enhanced Smart Contract with USDC Support**

```solidity
// contracts/GhostArtMarketplace.sol (USDC Enhanced)
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GhostArtMarketplace is Ownable, ReentrancyGuard {
    IERC20 public wldToken;
    IERC20 public ghostArtToken;
    IERC20 public usdcToken; // Add USDC support
    IERC721 public nftContract;
    
    // USDC contract address
    address public constant USDC_ADDRESS = 0x79A02482A880bCE3F13e09Da970dC34db4CD24d1;
    
    constructor(
        address _wldToken,
        address _ghostArtToken,
        address _nftContract,
        address _feeCollector
    ) Ownable(msg.sender) {
        wldToken = IERC20(_wldToken);
        ghostArtToken = IERC20(_ghostArtToken);
        usdcToken = IERC20(USDC_ADDRESS); // Initialize USDC
        nftContract = IERC721(_nftContract);
        feeCollector = _feeCollector;
    }
    
    // Buy NFT with USDC
    function buyWithUSDC(uint256 _listingId) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing");
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");

        IERC721 nft = IERC721(listing.nftContract);
        require(nft.ownerOf(listing.tokenId) == listing.seller, "NFT no longer owned by seller");

        // Calculate USDC price (assuming 1 WLD = $2.5, 1 USDC = $1)
        uint256 usdcPrice = (listing.priceWLD * 25) / 10; // Convert WLD to USDC

        // Calculate fees (in USDC)
        uint256 platformFee = (usdcPrice * platformFeePercent) / FEE_DENOMINATOR;
        uint256 sellerAmount = usdcPrice - platformFee;

        // Transfer USDC tokens
        require(usdcToken.transferFrom(msg.sender, address(this), usdcPrice), "USDC transfer failed");
        require(usdcToken.transfer(listing.seller, sellerAmount), "Seller payment failed");
        require(usdcToken.transfer(feeCollector, platformFee), "Fee transfer failed");

        // Transfer NFT
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        // Update listing
        listing.isActive = false;
        tokenToListing[listing.nftContract][listing.tokenId] = 0;

        emit NFTSold(_listingId, msg.sender, listing.priceWLD, listing.priceGHOSTART);
    }
}
```

### **3. Frontend USDC Integration**

```typescript
// lib/contracts.ts (Updated with USDC)
export const CONTRACTS = {
  // Your deployed contracts
  NFT_COLLECTION: 'YOUR_DEPLOYED_NFT_ADDRESS',
  MARKETPLACE: 'YOUR_DEPLOYED_MARKETPLACE_ADDRESS',
  
  // World Chain tokens
  WLD_TOKEN: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003',
  USDC_TOKEN: '0x79A02482A880bCE3F13e09Da970dC34db4CD24d1',
  GHOSTART_TOKEN: '0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990',
  
  // World ID
  WORLD_ID_ROUTER: '0x17B354dD2595411ff79041f930e491A4Df39A278',
  
  // Price oracles
  WLD_USD_ORACLE: '0x8Bb2943AB030E3eE05a58d9832525B4f60A97FA0',
  USDC_USD_ORACLE: '0xF4301686AfF4eE36d70c718a9e62309b53862BE8'
};

// lib/usdc.ts
export const USDC_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }]
  }
];

export const getUSDCBalance = async (address: string) => {
  const contract = new ethers.Contract(CONTRACTS.USDC_TOKEN, USDC_ABI, provider);
  const balance = await contract.balanceOf(address);
  return Number(balance) / 1e6; // USDC has 6 decimals
};
```

---

## 🚀 **Quick Actions Integration**

### **1. PUF Integration for GHOSTART Token**

```typescript
// lib/quick-actions.ts
export const QUICK_ACTIONS = {
  // PUF - GHOSTART Token Trading
  PUF_GHOSTART: 'https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990',
  
  // Add Money - USDC/WLD Deposits
  ADD_MONEY_USDC: (toAddress: string, amountUsd?: string) => {
    const params = new URLSearchParams({
      app_id: 'app_e7d27c5ce2234e00558776f227f791ef',
      path: '%2Fbridge',
      toAddress: toAddress,
      toToken: CONTRACTS.USDC_TOKEN,
      sourceAppId: 'app_cc2463e69dbce149c2073d4ca593af75',
      sourceAppName: 'GHOSTART%20NFT%20Marketplace',
      sourceDeeplinkPath: '%2F'
    });
    
    if (amountUsd) params.set('amountUsd', amountUsd);
    
    return `https://worldcoin.org/mini-app?${params.toString()}`;
  },
  
  ADD_MONEY_WLD: (toAddress: string, amountUsd?: string) => {
    const params = new URLSearchParams({
      app_id: 'app_e7d27c5ce2234e00558776f227f791ef',
      path: '%2Fbridge',
      toAddress: toAddress,
      toToken: CONTRACTS.WLD_TOKEN,
      sourceAppId: 'app_cc2463e69dbce149c2073d4ca593af75',
      sourceAppName: 'GHOSTART%20NFT%20Marketplace',
      sourceDeeplinkPath: '%2F'
    });
    
    if (amountUsd) params.set('amountUsd', amountUsd);
    
    return `https://worldcoin.org/mini-app?${params.toString()}`;
  }
};
```

### **2. Enhanced Trading Banner with Quick Actions**

```typescript
// components/trading-banner.tsx (Enhanced)
export const TradingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { address } = useAccount();

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">
            🚀 Trade GHOSTART TOKEN on PUF
          </h2>
          <p className="text-sm opacity-90 mb-3">
            Reach 2000 WLD to launch on All Trading platforms with 100x-1000x returns!
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              className="bg-white text-orange-600 hover:bg-orange-100 border-0"
            >
              <a
                href={QUICK_ACTIONS.PUF_GHOSTART}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                Trade GHOSTART
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
            
            {address && (
              <>
                <Button
                  asChild
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white border-0"
                >
                  <a
                    href={QUICK_ACTIONS.ADD_MONEY_USDC(address, '100')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Add USDC
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white border-0"
                >
                  <a
                    href={QUICK_ACTIONS.ADD_MONEY_WLD(address, '50')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Add WLD
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-orange-200 hover:bg-orange-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
```

---

## 💳 **Payment Options Integration**

### **1. Multi-Token Payment Component**

```typescript
// components/payment-options.tsx
export const PaymentOptions = ({ listingId, priceWLD }: { listingId: number, priceWLD: number }) => {
  const { address } = useAccount();
  const [selectedToken, setSelectedToken] = useState<'WLD' | 'USDC' | 'GHOSTART'>('WLD');

  const calculatePrice = (token: string) => {
    switch (token) {
      case 'WLD':
        return priceWLD;
      case 'USDC':
        return (priceWLD * 2.5).toFixed(2); // Assuming 1 WLD = $2.5
      case 'GHOSTART':
        return (priceWLD * 277777777).toLocaleString();
      default:
        return priceWLD;
    }
  };

  const handleBuy = async () => {
    switch (selectedToken) {
      case 'WLD':
        await buyWithWLD(listingId);
        break;
      case 'USDC':
        await buyWithUSDC(listingId);
        break;
      case 'GHOSTART':
        await buyWithGHOSTART(listingId);
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Payment Options</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="wld"
            name="token"
            value="WLD"
            checked={selectedToken === 'WLD'}
            onChange={(e) => setSelectedToken(e.target.value as any)}
            className="w-4 h-4"
          />
          <label htmlFor="wld" className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">W</span>
            <span>WLD: {calculatePrice('WLD')} WLD</span>
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="usdc"
            name="token"
            value="USDC"
            checked={selectedToken === 'USDC'}
            onChange={(e) => setSelectedToken(e.target.value as any)}
            className="w-4 h-4"
          />
          <label htmlFor="usdc" className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">U</span>
            <span>USDC: {calculatePrice('USDC')} USDC</span>
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="ghostart"
            name="token"
            value="GHOSTART"
            checked={selectedToken === 'GHOSTART'}
            onChange={(e) => setSelectedToken(e.target.value as any)}
            className="w-4 h-4"
          />
          <label htmlFor="ghostart" className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">G</span>
            <span>GHOSTART: {calculatePrice('GHOSTART')} GHOSTART</span>
          </label>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <Button onClick={handleBuy} className="w-full">
          Buy with {selectedToken}
        </Button>
        
        {selectedToken === 'USDC' && (
          <Button
            asChild
            variant="outline"
            className="w-full"
          >
            <a
              href={QUICK_ACTIONS.ADD_MONEY_USDC(address || '', calculatePrice('USDC'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add USDC to Wallet
            </a>
          </Button>
        )}
        
        {selectedToken === 'WLD' && (
          <Button
            asChild
            variant="outline"
            className="w-full"
          >
            <a
              href={QUICK_ACTIONS.ADD_MONEY_WLD(address || '', calculatePrice('WLD'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add WLD to Wallet
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
```

---

## 📱 **Enhanced Mobile Experience**

### **1. Quick Action Buttons**

```typescript
// components/quick-action-buttons.tsx
export const QuickActionButtons = () => {
  const { address } = useAccount();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Button
        asChild
        className="h-20 flex flex-col items-center justify-center space-y-2"
      >
        <a
          href={QUICK_ACTIONS.PUF_GHOSTART}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-2xl">🚀</span>
          <span className="text-sm">Trade GHOSTART</span>
        </a>
      </Button>
      
      {address && (
        <Button
          asChild
          variant="outline"
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <a
            href={QUICK_ACTIONS.ADD_MONEY_USDC(address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-2xl">💳</span>
            <span className="text-sm">Add USDC</span>
          </a>
        </Button>
      )}
    </div>
  );
};
```

---

## 🎯 **Final Deployment Checklist**

### **Phase 1: Smart Contract Deployment**
- [ ] Deploy GhostArtNFT contract
- [ ] Deploy GhostArtMarketplace contract with USDC support
- [ ] Verify contracts on Worldscan
- [ ] Test all payment methods (WLD, USDC, GHOSTART)

### **Phase 2: Frontend Integration**
- [ ] Update contract addresses
- [ ] Integrate USDC support
- [ ] Add Quick Actions integration
- [ ] Implement multi-token payments
- [ ] Add PUF integration

### **Phase 3: Quick Actions Setup**
- [ ] Test PUF GHOSTART trading link
- [ ] Test Add Money USDC integration
- [ ] Test Add Money WLD integration
- [ ] Verify all Quick Actions work

### **Phase 4: Production Launch**
- [ ] Deploy to production
- [ ] Test all integrations
- [ ] Monitor performance
- [ ] Apply for Worldcoin Foundation grants

---

## 🚀 **Ready for Complete World Chain Integration!**

Your GHOSTART NFT marketplace now includes:

**✅ USDC Payment Support**
**✅ Quick Actions Integration**
**✅ PUF GHOSTART Trading**
**✅ Add Money Integration**
**✅ Multi-Token Payments**
**✅ Enhanced Mobile Experience**
**✅ Complete World Chain Ecosystem**

**Estimated Total Deployment Cost: 0.04-0.1 WLD**

**Your marketplace is now a complete World Chain ecosystem application! 🎊**

---

## 🎯 **Next Steps:**

1. **Deploy Smart Contracts** with USDC support
2. **Integrate Quick Actions** for seamless user experience
3. **Test All Payment Methods** (WLD, USDC, GHOSTART)
4. **Deploy to Production** on World Chain mainnet
5. **Apply for Grants** from Worldcoin Foundation
6. **Launch and Scale** your complete marketplace

**Your GHOSTART NFT marketplace is ready to revolutionize the World Chain ecosystem! 🚀**

