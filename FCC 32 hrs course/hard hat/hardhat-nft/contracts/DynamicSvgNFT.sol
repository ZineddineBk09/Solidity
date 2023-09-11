// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

contract DynamicSvgNFT is ERC721 {
    uint256 private s_tokenCounter;
    string[] private i_imagesUris;
    string private constant base64EncodedSvgPrefix =
        "data:image/svg+xml;base64,";

    constructor(string[] memory imagesUris) ERC721("Monuments", "MNM") {
        s_tokenCounter = 0;
    }

    function svgToImageURI(
        string memory svg
    ) public pure returns (string memory) {
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );

        return
            string(abi.encodePacked(base64EncodedSvgPrefix, svgBase64Encoded));
    }

    function mintNFT() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }

    function _baseURI() internal pure virtual override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "URI Query for nonexistent token");
        string memory imageURI = "";

        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":',
                                name(),
                                '", "description": "Monument NFTs", "image": "',
                                imageURI,
                                '", "attributes": [{"trait_type": "coolness", "value": "100"}]}'
                                '"}'
                            )
                        )
                    )
                )
            );
    }
}
