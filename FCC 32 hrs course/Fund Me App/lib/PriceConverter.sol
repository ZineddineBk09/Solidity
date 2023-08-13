// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// libraries can't have state variables and also can't send ether and all library functions will be internal
library PriceConverter {
    // get the ETH/USD price feed
    function getPrice() public view returns (uint256) {
        // we need the ABI + Address of the contract that we want to interact with
        // address: 0x694AA1769357215DE4FAC081bf1f309aDC325306;
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );

        (, int answer, , , ) = priceFeed.latestRoundData();

        // 1 ETH = 10^18 wei
        // the answer will have 8 decimals so we need to multiply it by 10^10 to get the price in wei
        return uint256(answer * 1e10);
    }

    function getConversionRate(
        uint256 ethAmount
    ) public view returns (uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;

        return ethAmountInUsd;
    }
}
