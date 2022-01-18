// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves; // init to 0 and stored permanently in contract storage

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender); // msg.sender is wallet address of person who called wave()
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
    
}