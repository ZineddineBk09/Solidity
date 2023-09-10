// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

contract BasicNFT is ERC721 {
    uint256 private s_tokenCounter;

    constructor() ERC721("Hamizzy", "HAM") {
        s_tokenCounter = 0;
    }

    function mintNFT() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
        return s_tokenCounter;
    }
}
