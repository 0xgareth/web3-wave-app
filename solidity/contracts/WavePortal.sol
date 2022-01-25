// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves; // init to 0 and stored permanently in contract storage
    
    uint256 private seed; // for generating a random number to pick a winner

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // address of user
        string message; // message sent by user
        uint256 timestamp; // timestamp of wave
    }

    // holds an array of Wave structs
    Wave[] waves;

    constructor() payable {
        console.log("I AM A SMART CONTRACT. POG.");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved w/ message %s", msg.sender, _message); // msg.sender is wallet address of person who called wave()

        waves.push(Wave(msg.sender, _message, block.timestamp));
        /*
         * Generate a new seed for the next user that sends a wave
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
    
}