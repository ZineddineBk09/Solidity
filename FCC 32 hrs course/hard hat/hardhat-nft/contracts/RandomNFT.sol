// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

contract RandomNFT {
    // when we mint an NFT, we will trigger chainlink VRF to get us a random number
    // using that number we will get a random NFT of #: Shiba Inu, Pug, St. Bernard
    // Pug: super rare, Shiba: sort of rare, and St. Bernard: common

    // users have to pay to mint an NFT
    // the owner of the contract can withdraw the ETH

    function RequestNFT() {}

    function fullfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) {}
}
