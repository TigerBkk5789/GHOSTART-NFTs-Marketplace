// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

/**
 * @title GhostArtMarketplace
 * @dev NFT marketplace for GhostArt NFTs with dual token support
 */
contract GhostArtMarketplace is ReentrancyGuard, Ownable, ERC721Holder {
    using EnumerableSet for EnumerableSet.UintSet;
    
    // Marketplace fee (in basis points, 250 = 2.5%)
    uint256 public constant MARKETPLACE_FEE = 250;
    uint256 public constant BASIS_POINTS = 10000;
    
    // Token addresses
    IERC20 public immutable wldToken;
    IERC20 public immutable ghostArtToken;
    IERC721 public immutable nftContract;
    
    // Fee collector address
    address public feeCollector;
    
    // Listing structure
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 priceWLD;
        uint256 priceGHOSTART;
        bool isActive;
        uint256 timestamp;
    }
    
    // Offer structure
    struct Offer {
        address offerer;
        uint256 amountWLD;
        uint256 amountGHOSTART;
        bool isActive;
        uint256 timestamp;
        uint256 expiration;
    }
    
    // Storage
    Listing[] public listings;
    mapping(uint256 => Offer[]) public offers; // listingId => offers
    mapping(address => EnumerableSet.UintSet) private userListings;
    mapping(address => mapping(uint256 => bool)) public userOffers; // user => listingId => hasOffer
    
    // Events
    event NFTListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 priceWLD,
        uint256 priceGHOSTART
    );
    
    event NFTSold(
        uint256 indexed listingId,
        address indexed seller,
        address indexed buyer,
        uint256 tokenId,
        uint256 price,
        bool paidWithWLD
    );
    
    event ListingCancelled(uint256 indexed listingId);
    event OfferMade(uint256 indexed listingId, address indexed offerer, uint256 amountWLD, uint256 amountGHOSTART);
    event OfferAccepted(uint256 indexed listingId, address indexed offerer);
    event OfferCancelled(uint256 indexed listingId, address indexed offerer);
    
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
    
    /**
     * @dev List NFT for sale
     * @param _nftContract Address of NFT contract
     * @param _tokenId Token ID to list
     * @param _priceWLD Price in WLD (18 decimals)
     */
    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _priceWLD
    ) external nonReentrant {
        require(_nftContract != address(0), "Invalid NFT contract");
        require(_priceWLD > 0, "Price must be greater than 0");
        
        // Verify ownership and approval
        require(IERC721(_nftContract).ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(
            IERC721(_nftContract).isApprovedForAll(msg.sender, address(this)) ||
            IERC721(_nftContract).getApproved(_tokenId) == address(this),
            "Marketplace not approved"
        );
        
        // Calculate GHOSTART price (assuming 1 GHOSTART = 0.000009 USDT)
        // For pricing: 1 WLD ≈ $2.5, so 1 GHOSTART = 0.000009 USDT
        // This means 1 WLD = ~277,777,777 GHOSTART
        uint256 priceGHOSTART = _priceWLD * 277777777;
        
        // Create listing
        uint256 listingId = listings.length;
        listings.push(Listing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            priceWLD: _priceWLD,
            priceGHOSTART: priceGHOSTART,
            isActive: true,
            timestamp: block.timestamp
        }));
        
        userListings[msg.sender].add(listingId);
        
        emit NFTListed(listingId, msg.sender, _nftContract, _tokenId, _priceWLD, priceGHOSTART);
    }
    
    /**
     * @dev Buy NFT with WLD
     * @param _listingId Listing ID to buy
     */
    function buyWithWLD(uint256 _listingId) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing ID");
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");
        
        // Calculate fees
        uint256 fee = (listing.priceWLD * MARKETPLACE_FEE) / BASIS_POINTS;
        uint256 sellerAmount = listing.priceWLD - fee;
        
        // Transfer WLD tokens
        require(wldToken.transferFrom(msg.sender, feeCollector, fee), "Fee transfer failed");
        require(wldToken.transferFrom(msg.sender, listing.seller, sellerAmount), "Payment transfer failed");
        
        // Transfer NFT
        IERC721(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Update listing
        listing.isActive = false;
        userListings[listing.seller].remove(_listingId);
        
        emit NFTSold(_listingId, listing.seller, msg.sender, listing.tokenId, listing.priceWLD, true);
    }
    
    /**
     * @dev Buy NFT with GHOSTART tokens
     * @param _listingId Listing ID to buy
     */
    function buyWithGHOSTART(uint256 _listingId) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing ID");
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");
        
        // Calculate fees
        uint256 fee = (listing.priceGHOSTART * MARKETPLACE_FEE) / BASIS_POINTS;
        uint256 sellerAmount = listing.priceGHOSTART - fee;
        
        // Transfer GHOSTART tokens
        require(ghostArtToken.transferFrom(msg.sender, feeCollector, fee), "Fee transfer failed");
        require(ghostArtToken.transferFrom(msg.sender, listing.seller, sellerAmount), "Payment transfer failed");
        
        // Transfer NFT
        IERC721(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Update listing
        listing.isActive = false;
        userListings[listing.seller].remove(_listingId);
        
        emit NFTSold(_listingId, listing.seller, msg.sender, listing.tokenId, listing.priceGHOSTART, false);
    }
    
    /**
     * @dev Cancel listing
     * @param _listingId Listing ID to cancel
     */
    function cancelListing(uint256 _listingId) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing ID");
        Listing storage listing = listings[_listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing not active");
        
        listing.isActive = false;
        userListings[msg.sender].remove(_listingId);
        
        emit ListingCancelled(_listingId);
    }
    
    /**
     * @dev Make offer for NFT
     * @param _listingId Listing ID to make offer for
     * @param _amountWLD Offer amount in WLD
     * @param _amountGHOSTART Offer amount in GHOSTART
     * @param _duration Offer duration in seconds
     */
    function makeOffer(
        uint256 _listingId,
        uint256 _amountWLD,
        uint256 _amountGHOSTART,
        uint256 _duration
    ) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing ID");
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(listing.seller != msg.sender, "Cannot offer on your own NFT");
        require(!userOffers[msg.sender][_listingId], "Already have active offer");
        require(_duration > 0 && _duration <= 7 days, "Invalid duration");
        
        // Transfer tokens as escrow
        if (_amountWLD > 0) {
            require(wldToken.transferFrom(msg.sender, address(this), _amountWLD), "WLD transfer failed");
        }
        if (_amountGHOSTART > 0) {
            require(ghostArtToken.transferFrom(msg.sender, address(this), _amountGHOSTART), "GHOSTART transfer failed");
        }
        
        // Create offer
        offers[_listingId].push(Offer({
            offerer: msg.sender,
            amountWLD: _amountWLD,
            amountGHOSTART: _amountGHOSTART,
            isActive: true,
            timestamp: block.timestamp,
            expiration: block.timestamp + _duration
        }));
        
        userOffers[msg.sender][_listingId] = true;
        
        emit OfferMade(_listingId, msg.sender, _amountWLD, _amountGHOSTART);
    }
    
    /**
     * @dev Accept offer
     * @param _listingId Listing ID
     * @param _offerIndex Offer index to accept
     */
    function acceptOffer(uint256 _listingId, uint256 _offerIndex) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing ID");
        Listing storage listing = listings[_listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing not active");
        require(_offerIndex < offers[_listingId].length, "Invalid offer index");
        
        Offer storage offer = offers[_listingId][_offerIndex];
        require(offer.isActive, "Offer not active");
        require(offer.expiration > block.timestamp, "Offer expired");
        
        // Calculate fees
        uint256 wldFee = (offer.amountWLD * MARKETPLACE_FEE) / BASIS_POINTS;
        uint256 ghostArtFee = (offer.amountGHOSTART * MARKETPLACE_FEE) / BASIS_POINTS;
        
        // Transfer tokens to seller (minus fees)
        if (offer.amountWLD > 0) {
            require(wldToken.transfer(feeCollector, wldFee), "WLD fee transfer failed");
            require(wldToken.transfer(listing.seller, offer.amountWLD - wldFee), "WLD transfer failed");
        }
        if (offer.amountGHOSTART > 0) {
            require(ghostArtToken.transfer(feeCollector, ghostArtFee), "GHOSTART fee transfer failed");
            require(ghostArtToken.transfer(listing.seller, offer.amountGHOSTART - ghostArtFee), "GHOSTART transfer failed");
        }
        
        // Transfer NFT
        IERC721(listing.nftContract).safeTransferFrom(listing.seller, offer.offerer, listing.tokenId);
        
        // Update listing and offer
        listing.isActive = false;
        offer.isActive = false;
        userListings[listing.seller].remove(_listingId);
        userOffers[offer.offerer][_listingId] = false;
        
        emit OfferAccepted(_listingId, offer.offerer);
        emit NFTSold(_listingId, listing.seller, offer.offerer, listing.tokenId, offer.amountWLD + offer.amountGHOSTART, offer.amountWLD > 0);
    }
    
    /**
     * @dev Cancel offer
     * @param _listingId Listing ID
     * @param _offerIndex Offer index to cancel
     */
    function cancelOffer(uint256 _listingId, uint256 _offerIndex) external nonReentrant {
        require(_listingId < listings.length, "Invalid listing ID");
        require(_offerIndex < offers[_listingId].length, "Invalid offer index");
        
        Offer storage offer = offers[_listingId][_offerIndex];
        require(offer.offerer == msg.sender, "Not the offerer");
        require(offer.isActive, "Offer not active");
        
        // Return tokens
        if (offer.amountWLD > 0) {
            require(wldToken.transfer(msg.sender, offer.amountWLD), "WLD return failed");
        }
        if (offer.amountGHOSTART > 0) {
            require(ghostArtToken.transfer(msg.sender, offer.amountGHOSTART), "GHOSTART return failed");
        }
        
        offer.isActive = false;
        userOffers[msg.sender][_listingId] = false;
        
        emit OfferCancelled(_listingId, msg.sender);
    }
    
    /**
     * @dev Get listing details
     */
    function getListing(uint256 _listingId) external view returns (Listing memory) {
        require(_listingId < listings.length, "Invalid listing ID");
        return listings[_listingId];
    }
    
    /**
     * @dev Get all offers for a listing
     */
    function getOffers(uint256 _listingId) external view returns (Offer[] memory) {
        require(_listingId < listings.length, "Invalid listing ID");
        return offers[_listingId];
    }
    
    /**
     * @dev Get user's listings
     */
    function getUserListings(address _user) external view returns (uint256[] memory) {
        return userListings[_user].values();
    }
    
    /**
     * @dev Get total listings count
     */
    function getTotalListings() external view returns (uint256) {
        return listings.length;
    }
    
    /**
     * @dev Update fee collector
     */
    function setFeeCollector(address _feeCollector) external onlyOwner {
        require(_feeCollector != address(0), "Invalid fee collector");
        feeCollector = _feeCollector;
    }
    
    /**
     * @dev Emergency withdraw (owner only)
     */
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

