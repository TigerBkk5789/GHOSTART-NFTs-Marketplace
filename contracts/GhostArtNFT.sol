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



