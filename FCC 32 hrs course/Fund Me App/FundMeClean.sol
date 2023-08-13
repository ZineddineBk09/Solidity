// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lib/PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUSD = 50 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        require(
            (msg.value.getConversionRate()) >= minimumUSD,
            "You need to spend more ETH"
        );

        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    function withdraw() public {
        for (uint256 funderIndex; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
            payable(funder).transfer(addressToAmountFunded[funder]);
        }

        funders = new address[](0);
    }
}
