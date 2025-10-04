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

        // Calculate GHOSTART price (1 GHOSTART = $0.000009 USDT)
        // For pricing: 1 WLD ≈ $2.5, so 1 WLD = 2.5 / 0.000009 = 277,777,777 GHOSTART
        // Using 18 decimals: 277777777 * 10^18
        uint256 priceGHOSTART = _priceWLD * 277777777 * 10**18;

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

