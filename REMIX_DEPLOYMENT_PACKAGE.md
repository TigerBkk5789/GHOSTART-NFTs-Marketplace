# 🔗 Smart Contract Deployment Package for Remix IDE

## 📁 Files to Upload to Remix IDE

### 1. GhostArtNFT.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GhostArtNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Maximum supply
    uint256 public constant MAX_SUPPLY = 10000;

    // Free mint allocation
    uint256 public constant FREE_MINT_SUPPLY = 1000;

    // Minting price in wei
    uint256 public mintPrice = 0.001 ether;

    // Track free mints per address
    mapping(address => bool) public hasClaimedFreeMint;
    uint256 public freeMintCount;

    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event FreeNFTClaimed(address indexed to, uint256 indexed tokenId, string tokenURI);
    event BaseURIUpdated(string newBaseURI);
    event MintPriceUpdated(uint256 newPrice);

    constructor() ERC721("GHOSTART NFT", "GHOSTART") Ownable(msg.sender) {}

    function safeMint(address to, string memory uri) public onlyOwner {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NFTMinted(to, tokenId, uri);
    }

    function mintNFT(address to, string memory tokenURI) public payable nonReentrant returns (uint256) {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= mintPrice, "Insufficient payment");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NFTMinted(to, tokenId, tokenURI);

        return tokenId;
    }

    function claimFreeNFT(string memory tokenURI) public nonReentrant returns (uint256) {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");
        require(freeMintCount < FREE_MINT_SUPPLY, "Free mint allocation exhausted");
        require(!hasClaimedFreeMint[msg.sender], "Already claimed free mint");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        freeMintCount++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        hasClaimedFreeMint[msg.sender] = true;

        emit FreeNFTClaimed(msg.sender, tokenId, tokenURI);

        return tokenId;
    }

    function getFreeMintInfo() public view returns (uint256 remaining, bool canClaim) {
        remaining = FREE_MINT_SUPPLY - freeMintCount;
        canClaim = remaining > 0 && !hasClaimedFreeMint[msg.sender];
        return (remaining, canClaim);
    }

    function setMintPrice(uint256 _newPrice) public onlyOwner {
        mintPrice = _newPrice;
        emit MintPriceUpdated(_newPrice);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
```

### 2. GhostArtMarketplace.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract GhostArtMarketplace is Ownable, ReentrancyGuard {
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 priceWLD;
        uint256 priceGHOSTART;
        bool isActive;
    }

    IERC20 public wldToken;
    IERC20 public ghostArtToken;
    IERC721 public nftContract;
    address public feeCollector;
    
    uint256 public platformFeePercent = 250; // 2.5%
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    Listing[] public listings;
    mapping(address => mapping(uint256 => uint256)) public tokenToListing;
    
    event NFTListed(uint256 indexed listingId, address indexed seller, address indexed nftContract, uint256 tokenId, uint256 priceWLD, uint256 priceGHOSTART);
    event NFTSold(uint256 indexed listingId, address indexed buyer, uint256 priceWLD, uint256 priceGHOSTART);
    event ListingCancelled(uint256 indexed listingId);
    event PlatformFeeUpdated(uint256 newFeePercent);

    constructor(
        address _wldToken,
        address _ghostArtToken,
        address _nftContract,
        address _feeCollector
    ) Ownable(msg.sender) {
        wldToken = IERC20(_wldToken);
        ghostArtToken = IERC20(_ghostArtToken);
        nftContract = IERC721(_nftContract);
        feeCollector = _feeCollector;
    }

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _priceWLD
    ) external nonReentrant {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(_tokenId) == address(this), "Not approved");
        require(_priceWLD > 0, "Price must be greater than 0");
        require(tokenToListing[_nftContract][_tokenId] == 0, "Already listed");

        // Calculate GHOSTART price (assuming 1 GHOSTART = 0.000009 USDT)
        // For pricing: 1 WLD ≈ $2.5, so 1 GHOSTART = ~277,777,777 GHOSTART
        uint256 priceGHOSTART = _priceWLD * 277777777;

        uint256 listingId = listings.length;
        listings.push(Listing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            priceWLD: _priceWLD,
            priceGHOSTART: priceGHOSTART,
            isActive: true
        }));

        tokenToListing[_nftContract][_tokenId] = listingId + 1; // +1 to distinguish from 0

        emit NFTListed(listingId, msg.sender, _nftContract, _tokenId, _priceWLD, priceGHOSTART);
    }

    function buyWithWLD(uint256 _listingId) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing");
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");

        IERC721 nft = IERC721(listing.nftContract);
        require(nft.ownerOf(listing.tokenId) == listing.seller, "NFT no longer owned by seller");

        // Calculate fees
        uint256 platformFee = (listing.priceWLD * platformFeePercent) / FEE_DENOMINATOR;
        uint256 sellerAmount = listing.priceWLD - platformFee;

        // Transfer WLD tokens
        require(wldToken.transferFrom(msg.sender, address(this), listing.priceWLD), "WLD transfer failed");
        require(wldToken.transfer(listing.seller, sellerAmount), "Seller payment failed");
        require(wldToken.transfer(feeCollector, platformFee), "Fee transfer failed");

        // Transfer NFT
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        // Update listing
        listing.isActive = false;
        tokenToListing[listing.nftContract][listing.tokenId] = 0;

        emit NFTSold(_listingId, msg.sender, listing.priceWLD, listing.priceGHOSTART);
    }

    function buyWithGHOSTART(uint256 _listingId) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing");
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");

        IERC721 nft = IERC721(listing.nftContract);
        require(nft.ownerOf(listing.tokenId) == listing.seller, "NFT no longer owned by seller");

        // Calculate fees (in GHOSTART)
        uint256 platformFee = (listing.priceGHOSTART * platformFeePercent) / FEE_DENOMINATOR;
        uint256 sellerAmount = listing.priceGHOSTART - platformFee;

        // Transfer GHOSTART tokens
        require(ghostArtToken.transferFrom(msg.sender, address(this), listing.priceGHOSTART), "GHOSTART transfer failed");
        require(ghostArtToken.transfer(listing.seller, sellerAmount), "Seller payment failed");
        require(ghostArtToken.transfer(feeCollector, platformFee), "Fee transfer failed");

        // Transfer NFT
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        // Update listing
        listing.isActive = false;
        tokenToListing[listing.nftContract][listing.tokenId] = 0;

        emit NFTSold(_listingId, msg.sender, listing.priceWLD, listing.priceGHOSTART);
    }

    function cancelListing(uint256 _listingId) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing");
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller == msg.sender, "Not the seller");

        listing.isActive = false;
        tokenToListing[listing.nftContract][listing.tokenId] = 0;

        emit ListingCancelled(_listingId);
    }

    function getListing(uint256 _listingId) external view returns (Listing memory) {
        require(_listingId < listings.length, "Invalid listing");
        return listings[_listingId];
    }

    function getAllListings() external view returns (Listing[] memory) {
        return listings;
    }

    function getActiveListings() external view returns (Listing[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < listings.length; i++) {
            if (listings[i].isActive) {
                activeCount++;
            }
        }

        Listing[] memory activeListings = new Listing[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < listings.length; i++) {
            if (listings[i].isActive) {
                activeListings[index] = listings[i];
                index++;
            }
        }

        return activeListings;
    }

    function setPlatformFee(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= 1000, "Fee cannot exceed 10%"); // Max 10%
        platformFeePercent = _newFeePercent;
        emit PlatformFeeUpdated(_newFeePercent);
    }

    function setFeeCollector(address _newFeeCollector) external onlyOwner {
        require(_newFeeCollector != address(0), "Invalid address");
        feeCollector = _newFeeCollector;
    }

    function emergencyWithdraw() external onlyOwner {
        uint256 wldBalance = wldToken.balanceOf(address(this));
        uint256 ghostArtBalance = ghostArtToken.balanceOf(address(this));
        
        if (wldBalance > 0) {
            wldToken.transfer(owner(), wldBalance);
        }
        
        if (ghostArtBalance > 0) {
            ghostArtToken.transfer(owner(), ghostArtBalance);
        }
    }
}
```

## 🚀 Deployment Instructions

### Step 1: Access Remix IDE
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create a new workspace called "GHOSTART-Marketplace"

### Step 2: Install Dependencies
1. Go to "File Manager" tab
2. Click on "Dependencies" 
3. Add: `@openzeppelin/contracts@4.9.0`

### Step 3: Upload Contracts
1. Create new files in the `contracts` folder:
   - `GhostArtNFT.sol`
   - `GhostArtMarketplace.sol`
2. Copy the contract code above into each file

### Step 4: Compile Contracts
1. Go to "Solidity Compiler" tab
2. Select compiler version: `0.8.28`
3. Click "Compile GhostArtNFT.sol"
4. Click "Compile GhostArtMarketplace.sol"

### Step 5: Deploy to World Chain Sepolia
1. Go to "Deploy & Run Transactions" tab
2. Select "Injected Provider - MetaMask" (or your wallet)
3. Make sure you're connected to World Chain Sepolia
4. Deploy contracts in this order:

#### Deploy GhostArtNFT:
- Contract: `GhostArtNFT`
- Click "Deploy"

#### Deploy GhostArtMarketplace:
- Contract: `GhostArtMarketplace`
- Constructor arguments:
  - `0x2cFc85d8E48F8EAB294be644d9E25C3030863003` (WLD Token)
  - `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990` (GHOSTART Token)
  - `[Your deployed NFT contract address]`
  - `[Your wallet address for fee collection]`
- Click "Deploy"

## 📋 Required Information

### Before Deployment:
1. **Private Key**: Your wallet's private key (keep secure!)
2. **Fee Collector Address**: Your wallet address for collecting marketplace fees
3. **Testnet ETH**: Get from [World Chain Sepolia Faucet](https://www.alchemy.com/faucets/world-chain-sepolia)

### After Deployment:
1. **NFT Contract Address**: Save this address
2. **Marketplace Contract Address**: Save this address
3. **Update Frontend**: Add contract addresses to your frontend

## 🔗 Contract Addresses to Use

### World Chain Sepolia (Testnet)
- **WLD Token**: `0x2cFc85d8E48F8EAB294be644d9E25C3030863003`
- **GHOSTART Token**: `0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990`

## 🧪 Testing After Deployment

### Test NFT Contract:
1. Mint an NFT
2. Check ownership
3. Test free mint functionality

### Test Marketplace:
1. List an NFT
2. Buy with WLD
3. Buy with GHOSTART
4. Test fee collection

## 🔗 Integration with Frontend

After deployment, update your frontend with the deployed contract addresses:

```javascript
// lib/contracts.js
export const CONTRACTS = {
  NFT_COLLECTION: 'YOUR_DEPLOYED_NFT_ADDRESS',
  MARKETPLACE: 'YOUR_DEPLOYED_MARKETPLACE_ADDRESS',
  WLD_TOKEN: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003',
  GHOSTART_TOKEN: '0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990'
};
```

---

## 🎯 Ready to Deploy!

Follow the steps above to deploy your smart contracts to World Chain using Remix IDE. This method is the easiest and doesn't require local installation of Foundry.
