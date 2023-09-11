// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DynamicSvgNFT is ERC721 {
    uint256 private s_tokenCounter;
    string[] private i_imagesUris;
    string private constant base64EncodedSvgPrefix =
        "data:image/svg+xml;base64,";

    constructor(string[] memory imagesUris) ERC721("Monuments", "MNM") {
        s_tokenCounter = 0;
    }

    function svgToImageURI() public pure returns (string memory) {}

    function mintNFT() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }
}
