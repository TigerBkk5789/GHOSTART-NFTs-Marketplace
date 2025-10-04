// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/GhostArtNFT.sol";
import "../src/GhostArtMarketplace.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mock ERC20 token for testing
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10**18);
    }
    
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract GhostArtTest is Test {
    GhostArtNFT public nft;
    GhostArtMarketplace public marketplace;
    MockERC20 public wldToken;
    MockERC20 public ghostArtToken;
    
    address public owner = address(1);
    address public seller = address(2);
    address public buyer = address(3);
    address public feeCollector = address(4);
    
    function setUp() public {
        vm.startPrank(owner);
        
        // Deploy tokens
        wldToken = new MockERC20("World Token", "WLD");
        ghostArtToken = new MockERC20("GhostArt Token", "GHOSTART");
        
        // Deploy NFT contract
        nft = new GhostArtNFT();
        
        // Deploy marketplace
        marketplace = new GhostArtMarketplace(
            address(wldToken),
            address(ghostArtToken),
            address(nft),
            feeCollector
        );
        
        // Mint tokens to seller and buyer
        wldToken.mint(seller, 10000 * 10**18);
        wldToken.mint(buyer, 10000 * 10**18);
        ghostArtToken.mint(buyer, 277777777 * 10**18 * 100); // Updated for new pricing (100 WLD worth)
        
        vm.stopPrank();
    }
    
    function testMintNFT() public {
        vm.prank(seller);
        uint256 tokenId = nft.mintNFT(seller, "ipfs://QmTest123");
        
        assertEq(nft.ownerOf(tokenId), seller);
        assertEq(nft.tokenURI(tokenId), "ipfs://QmTest123");
    }
    
    function testListNFT() public {
        // Mint NFT
        vm.prank(seller);
        uint256 tokenId = nft.mintNFT(seller, "ipfs://QmTest123");
        
        // Approve marketplace
        vm.prank(seller);
        nft.setApprovalForAll(address(marketplace), true);
        
        // List NFT
        vm.prank(seller);
        marketplace.listNFT(address(nft), tokenId, 100 * 10**18);
        
        // Check listing
        GhostArtMarketplace.Listing memory listing = marketplace.getListing(0);
        assertEq(listing.seller, seller);
        assertEq(listing.tokenId, tokenId);
        assertTrue(listing.isActive);
    }
    
    function testBuyWithWLD() public {
        // Mint and list NFT
        vm.prank(seller);
        uint256 tokenId = nft.mintNFT(seller, "ipfs://QmTest123");
        
        vm.prank(seller);
        nft.setApprovalForAll(address(marketplace), true);
        
        vm.prank(seller);
        marketplace.listNFT(address(nft), tokenId, 100 * 10**18);
        
        // Approve WLD for marketplace
        vm.prank(buyer);
        wldToken.approve(address(marketplace), 100 * 10**18);
        
        // Buy NFT
        vm.prank(buyer);
        marketplace.buyWithWLD(0);
        
        // Verify ownership transferred
        assertEq(nft.ownerOf(tokenId), buyer);
    }
    
    function testBuyWithGHOSTART() public {
        // Mint and list NFT
        vm.prank(seller);
        uint256 tokenId = nft.mintNFT(seller, "ipfs://QmTest123");
        
        vm.prank(seller);
        nft.setApprovalForAll(address(marketplace), true);
        
        vm.prank(seller);
        marketplace.listNFT(address(nft), tokenId, 100 * 10**18);
        
        // Get GHOSTART price
        GhostArtMarketplace.Listing memory listing = marketplace.getListing(0);
        
        // Approve GHOSTART for marketplace (using new pricing ratio)
        vm.prank(buyer);
        ghostArtToken.approve(address(marketplace), listing.priceGHOSTART);
        
        // Buy NFT
        vm.prank(buyer);
        marketplace.buyWithGHOSTART(0);
        
        // Verify ownership transferred
        assertEq(nft.ownerOf(tokenId), buyer);
    }
    
    function testCancelListing() public {
        // Mint and list NFT
        vm.prank(seller);
        uint256 tokenId = nft.mintNFT(seller, "ipfs://QmTest123");
        
        vm.prank(seller);
        nft.setApprovalForAll(address(marketplace), true);
        
        vm.prank(seller);
        marketplace.listNFT(address(nft), tokenId, 100 * 10**18);
        
        // Cancel listing
        vm.prank(seller);
        marketplace.cancelListing(0);
        
        // Check listing is inactive
        GhostArtMarketplace.Listing memory listing = marketplace.getListing(0);
        assertFalse(listing.isActive);
    }
    
    function testClaimFreeNFT() public {
        // Check initial free mint info
        (uint256 remaining, bool canClaim) = nft.getFreeMintInfo();
        assertEq(remaining, 1000); // FREE_MINT_SUPPLY
        assertTrue(canClaim);
        
        // Claim free NFT
        uint256 tokenId = nft.claimFreeNFT("ipfs://QmFree123");
        
        assertEq(nft.ownerOf(tokenId), msg.sender);
        assertEq(nft.tokenURI(tokenId), "ipfs://QmFree123");
        assertTrue(nft.hasClaimedFreeMint(msg.sender));
        assertEq(nft.freeMintCount(), 1);
        
        // Check free mint info after claim
        (remaining, canClaim) = nft.getFreeMintInfo();
        assertEq(remaining, 999);
        assertFalse(canClaim);
    }
    
    function testCannotClaimFreeNFTTwice() public {
        // Claim first free NFT
        nft.claimFreeNFT("ipfs://QmFree123");
        
        // Try to claim again - should fail
        vm.expectRevert("Already claimed free mint");
        nft.claimFreeNFT("ipfs://QmFree456");
    }
    
    function testFreeMintAllocationExhausted() public {
        // Mint all free NFTs (simulate)
        for (uint256 i = 0; i < 1000; i++) {
            address user = address(uint160(i + 1000)); // Use different addresses
            vm.prank(user);
            nft.claimFreeNFT(string(abi.encodePacked("ipfs://QmFree", i)));
        }
        
        // Try to claim one more - should fail
        vm.expectRevert("Free mint allocation exhausted");
        nft.claimFreeNFT("ipfs://QmFree1000");
    }
}
