// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;
import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    event NewWave(address indexed from,uint256 timestamp, string message);
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }
    Wave[] waves;
    constructor() {
        console.log("I am a contract and I am smart");
    }
    function wave(string memory _message) public {
        totalWaves +=1;
        console.log("%s has waved!", msg.sender);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
    }
    function getTotalWaves() view public returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
