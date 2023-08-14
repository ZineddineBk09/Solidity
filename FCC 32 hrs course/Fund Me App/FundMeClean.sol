// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lib/PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {
        require(
            (msg.value.getConversionRate()) >= MINIMUM_USD,
            "You need to spend more ETH"
        );

        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    modifier isOwner() {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        _;
    }

    function withdraw() public isOwner {
        for (uint256 funderIndex; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
            payable(funder).transfer(addressToAmountFunded[funder]);
        }

        funders = new address[](0);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
