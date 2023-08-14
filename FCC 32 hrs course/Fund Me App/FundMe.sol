// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lib/PriceConverter.sol";

// NOTE: we're using Sepolia as a test network
// NOTE: contract can hold funds same as a wallet the only difference is that a contract can hold funds and do something with it (e.g. send it to another address) , because they an address

contract FundMe {
    // using PriceConverter for uint256 ==> which means we can call getConversionRate() on any uint256
    using PriceConverter for uint256;

    uint256 public minimumUSD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public owner;

    // NOTE: this is a special function that is called when the contract is deployed
    constructor() {
        // msg.sender of the constructor is the address that deployed the contract ==> contract owner
        owner = msg.sender;
    }

    function fund() public payable {
        // things to take in consideration:
        // 1. set a minimum amount of money to fund in USD
        // 2. how to send ETH to this contract

        // msg is a global variable that is available to us in solidity to get information about the transaction
        // msg.value use wei as unit ==> 1e18 wei = 1 ETH
        // if the value is less than 1 ETH then the transaction will revert and the ETH will be sent back to the sender and everything done in the transaction (fund function) will be reverted
        // BUT the gas will be spent anyway
        require(
            (msg.value.getConversionRate()) >= minimumUSD,
            "You need to spend more ETH"
        );

        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    // modifier is a function that can be run before another function to check if the condition is true or not
    modifier isOwner() {
        require(msg.sender == owner, "You're not the owner!");
        _;
    }

    // withdraw all the funds
    function withdraw() public isOwner {
        for (uint256 funderIndex; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;

            // transfer the funds to the funder
            // transfer() is a function that is available on the address type
            // transfer() will transfer the funds from this contract to the funder
            // transfer() will revert if it fails
            // transfer() will return a boolean value
            // payable is to check if the address is payable or not
            payable(funder).transfer(addressToAmountFunded[funder]);

            // we have 3 ways to transfer funds:
            // 1. transfer() ==> take only 2300 gas, if it's not enough then it will revert the tx
            // 2. send() ==> take only 2300 gas, will return a boolean value, but if it fails it will not revert the tx ==> no money will be sent back to the contract. that's why we use it with a require() to check if it's true or not
            // 3. call() ==> does not have gas limit, will return a boolean value, but if it fails it will not revert the tx ==> no money will be sent back to the contract. that's why we use it with a require() to check if it's true or not
        }

        // reset the funders array
        funders = new address[](0);
    }
}
