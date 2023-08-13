// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// NOTE: contract can hold funds same as a wallet the only difference is that a contract can hold funds and do something with it (e.g. send it to another address) , because they an address
contract FundMe {
    function fund() public payable {
        // things to take in consideration:
        // 1. set a minimum amount of money to fund in USD
        // 2. how to send ETH to this contract

        // msg is a global variable that is available to us in solidity to get information about the transaction
        // msg.value use wei as unit ==> 1e18 wei = 1 ETH
        // if the value is less than 1 ETH then the transaction will revert and the ETH will be sent back to the sender and everything done in the transaction (fund function) will be reverted
        // BUT the gas will be spent anyway
        require(msg.value > 1e18, "You need to spend more ETH");
    }

    function withdraw() internal {}
}
