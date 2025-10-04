// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title GhostArtFreeMint
 * @dev ERC721 NFT collection for free minting on World Chain
 * @notice This contract allows users to mint NFTs for free with World App wallet verification
 */
contract GhostArtFreeMint is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Maximum supply for free minting
    uint256 public constant MAX_FREE_SUPPLY = 5000;
    
    // Free mint allocation per address
    uint256 public constant FREE_MINTS_PER_ADDRESS = 1;
    
    // Track free mints per address
    mapping(address => uint256) public freeMintCount;
    mapping(address => bool) public isWorldAppVerified;
    
    // App fee for minting (in wei)
    uint256 public appFee = 0.0001 ether;
    
    // Creator information
    struct Creator {
        string name;
        address wallet;
        bool isActive;
        uint256 totalMints;
    }
    
    mapping(address => Creator) public creators;
    address[] public creatorAddresses;
    
    // Events
    event FreeNFTMinted(address indexed to, uint256 indexed tokenId, string tokenURI, address indexed creator);
    event CreatorRegistered(address indexed creator, string name);
    event WorldAppVerified(address indexed user);
    event AppFeeUpdated(uint256 newFee);
    event BaseURIUpdated(string newBaseURI);
    
    constructor() ERC721("GhostArt Free Mint", "GHOSTART-FREE") Ownable(msg.sender) {
        _baseTokenURI = "https://api.ghostart.world/free-mint-metadata/";
    }
    
    /**
     * @dev Register as a creator (requires World App wallet)
     * @param name Creator's display name
     */
    function registerCreator(string memory name) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(!creators[msg.sender].isActive, "Already registered as creator");
        
        creators[msg.sender] = Creator({
            name: name,
            wallet: msg.sender,
            isActive: true,
            totalMints: 0
        });
        
        creatorAddresses.push(msg.sender);
        
        emit CreatorRegistered(msg.sender, name);
    }
    
    /**
     * @dev Verify World App wallet (simplified for demo)
     * @param user Address to verify
     */
    function verifyWorldAppWallet(address user) public onlyOwner {
        isWorldAppVerified[user] = true;
        emit WorldAppVerified(user);
    }
    
    /**
     * @dev Free mint NFT (requires World App verification)
     * @param tokenURI URI for the NFT metadata
     * @param creatorAddress Address of the creator
     */
    function freeMint(string memory tokenURI, address creatorAddress) 
        public 
        payable 
        nonReentrant 
        returns (uint256) 
    {
        require(_tokenIdCounter.current() < MAX_FREE_SUPPLY, "Max free supply reached");
        require(freeMintCount[msg.sender] < FREE_MINTS_PER_ADDRESS, "Free mint limit reached");
        require(isWorldAppVerified[msg.sender], "World App wallet verification required");
        require(creators[creatorAddress].isActive, "Invalid creator");
        require(msg.value >= appFee, "App fee required");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        freeMintCount[msg.sender]++;
        creators[creatorAddress].totalMints++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit FreeNFTMinted(msg.sender, tokenId, tokenURI, creatorAddress);
        
        return tokenId;
    }
    
    /**
     * @dev Batch free mint multiple NFTs
     * @param tokenURIs Array of URIs for NFT metadata
     * @param creatorAddress Address of the creator
     */
    function batchFreeMint(string[] memory tokenURIs, address creatorAddress) 
        public 
        payable 
        nonReentrant 
        returns (uint256[] memory) 
    {
        require(_tokenIdCounter.current() + tokenURIs.length <= MAX_FREE_SUPPLY, "Exceeds max free supply");
        require(freeMintCount[msg.sender] + tokenURIs.length <= FREE_MINTS_PER_ADDRESS, "Free mint limit exceeded");
        require(isWorldAppVerified[msg.sender], "World App wallet verification required");
        require(creators[creatorAddress].isActive, "Invalid creator");
        require(msg.value >= appFee * tokenURIs.length, "Insufficient app fee");
        
        uint256[] memory tokenIds = new uint256[](tokenURIs.length);
        
        for (uint256 i = 0; i < tokenURIs.length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            freeMintCount[msg.sender]++;
            creators[creatorAddress].totalMints++;
            
            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);
            
            tokenIds[i] = tokenId;
            emit FreeNFTMinted(msg.sender, tokenId, tokenURIs[i], creatorAddress);
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Owner mint (for promotional purposes)
     */
    function ownerMint(address to, string memory tokenURI, address creatorAddress) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        require(_tokenIdCounter.current() < MAX_FREE_SUPPLY, "Max free supply reached");
        require(creators[creatorAddress].isActive, "Invalid creator");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        creators[creatorAddress].totalMints++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit FreeNFTMinted(to, tokenId, tokenURI, creatorAddress);
        
        return tokenId;
    }
    
    /**
     * @dev Update base URI
     */
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }
    
    /**
     * @dev Update app fee
     */
    function setAppFee(uint256 newFee) public onlyOwner {
        appFee = newFee;
        emit AppFeeUpdated(newFee);
    }
    
    /**
     * @dev Withdraw contract balance
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Get current token ID counter
     */
    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Get total supply
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Get free mint info for user
     */
    function getFreeMintInfo(address user) public view returns (
        uint256 remaining, 
        bool canMint, 
        bool isVerified,
        uint256 userMintCount
    ) {
        remaining = MAX_FREE_SUPPLY - _tokenIdCounter.current();
        canMint = remaining > 0 && freeMintCount[user] < FREE_MINTS_PER_ADDRESS && isWorldAppVerified[user];
        isVerified = isWorldAppVerified[user];
        userMintCount = freeMintCount[user];
        return (remaining, canMint, isVerified, userMintCount);
    }
    
    /**
     * @dev Get creator information
     */
    function getCreatorInfo(address creator) public view returns (Creator memory) {
        return creators[creator];
    }
    
    /**
     * @dev Get all creators
     */
    function getAllCreators() public view returns (address[] memory) {
        return creatorAddresses;
    }
    
    /**
     * @dev Override tokenURI to use base URI
     */
    function tokenURI(uint256 tokenId) 
        public 
        view 
        override(ERC721, ERC721URIStorage) 
        returns (string memory) 
    {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Override supportsInterface
     */
    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC721, ERC721URIStorage) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }
    
    /**
     * @dev Override _burn
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}


