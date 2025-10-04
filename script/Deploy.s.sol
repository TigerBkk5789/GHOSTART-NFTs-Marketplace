// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/GhostArtNFT.sol";
import "../src/GhostArtMarketplace.sol";

contract DeployScript is Script {
    // World Chain token addresses
    address constant WLD_TOKEN = 0x2cFc85d8E48F8EAB294be644d9E25C3030863003;
    address constant GHOSTART_TOKEN = 0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990;
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address feeCollector = vm.envAddress("FEE_COLLECTOR");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy NFT contract
        console.log("Deploying GhostArtNFT...");
        GhostArtNFT nft = new GhostArtNFT();
        console.log("GhostArtNFT deployed at:", address(nft));
        
        // Deploy Marketplace contract
        console.log("Deploying GhostArtMarketplace...");
        GhostArtMarketplace marketplace = new GhostArtMarketplace(
            WLD_TOKEN,
            GHOSTART_TOKEN,
            address(nft),
            feeCollector
        );
        console.log("GhostArtMarketplace deployed at:", address(marketplace));
        
        // Set marketplace as minter for NFT (if needed)
        // nft.setMinter(address(marketplace), true);
        
        vm.stopBroadcast();
        
        // Log deployment info
        console.log("\n=== Deployment Summary ===");
        console.log("Network: World Chain");
        console.log("NFT Contract:", address(nft));
        console.log("Marketplace Contract:", address(marketplace));
        console.log("WLD Token:", WLD_TOKEN);
        console.log("GHOSTART Token:", GHOSTART_TOKEN);
        console.log("Fee Collector:", feeCollector);
        console.log("Deployer:", vm.addr(deployerPrivateKey));
    }
}


