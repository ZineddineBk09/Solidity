// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// NOTE: contract can hold funds same as a wallet the only difference is that a contract can hold funds and do something with it (e.g. send it to another address)  
contract FundMe {
    function fund() public {
        // things to take in consideration:
        // 1. set a minimum amount of money to fund in USD
        // 2. how to send ETH to this contract
    }

    function withdraw() internal {}
}
