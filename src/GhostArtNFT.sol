// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title GhostArtNFT
 * @dev ERC721 NFT collection for GhostArt marketplace
 */
contract GhostArtNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
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
    
    constructor() ERC721("GhostArt NFT", "GHOSTART") Ownable(msg.sender) {
        _baseTokenURI = "https://api.ghostart.world/metadata/";
    }
    
    /**
     * @dev Mint NFT to specified address
     * @param to Address to mint NFT to
     * @param tokenURI URI for the NFT metadata
     */
    function mintNFT(address to, string memory tokenURI) 
        public 
        payable 
        nonReentrant 
        returns (uint256) 
    {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");
        require(msg.value >= mintPrice, "Insufficient payment");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(to, tokenId, tokenURI);
        
        return tokenId;
    }
    
    /**
     * @dev Batch mint multiple NFTs
     * @param to Address to mint NFTs to
     * @param tokenURIs Array of URIs for NFT metadata
     */
    function batchMint(address to, string[] memory tokenURIs) 
        public 
        payable 
        nonReentrant 
        returns (uint256[] memory) 
    {
        require(_tokenIdCounter.current() + tokenURIs.length <= MAX_SUPPLY, "Exceeds max supply");
        require(msg.value >= mintPrice * tokenURIs.length, "Insufficient payment");
        
        uint256[] memory tokenIds = new uint256[](tokenURIs.length);
        
        for (uint256 i = 0; i < tokenURIs.length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            
            _safeMint(to, tokenId);
            _setTokenURI(tokenId, tokenURIs[i]);
            
            tokenIds[i] = tokenId;
            emit NFTMinted(to, tokenId, tokenURIs[i]);
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Claim free NFT (limited to 1 per address)
     */
    function claimFreeNFT(string memory tokenURI) 
        public 
        nonReentrant 
        returns (uint256) 
    {
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
    
    /**
     * @dev Owner mint (for promotional purposes)
     */
    function ownerMint(address to, string memory tokenURI) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit NFTMinted(to, tokenId, tokenURI);
        
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
     * @dev Update mint price
     */
    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
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
     * @dev Get free mint info
     */
    function getFreeMintInfo() public view returns (uint256 remaining, bool canClaim) {
        remaining = FREE_MINT_SUPPLY - freeMintCount;
        canClaim = remaining > 0 && !hasClaimedFreeMint[msg.sender];
        return (remaining, canClaim);
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
