// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "base64-sol/base64.sol";

error DynamicSvgNFT__QueryForNonexistentToken();

contract DynamicSvgNFT is ERC721 {
    uint256 private s_tokenCounter;
    string private s_lowImageURI;
    string private s_highImageURI;
    string private constant base64EncodedSvgPrefix =
        "data:image/svg+xml;base64,";
    AggregatorV3Interface internal immutable priceFeed;
    mapping(uint256 => int256) private s_tokenIdToPrice;

    constructor(
        address priceFeedAddress,
        string memory lowSvg,
        string memory highSvg
    ) ERC721("Moods", "MNM") {
        s_tokenCounter = 0;
        s_lowImageURI = svgToImageURI(lowSvg);
        s_highImageURI = svgToImageURI(highSvg);
        priceFeed = AggregatorV3Interface(priceFeedAddress);
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

    function mintNFT(int256 highValue) public {
        s_tokenIdToPrice[s_tokenCounter] = highValue;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }

    function _baseURI() internal pure virtual override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert DynamicSvgNFT__QueryForNonexistentToken();
        }

        string memory imageURI = "";

        (, int256 price, , , ) = priceFeed.latestRoundData();
        if (price >= s_tokenIdToPrice[tokenId]) {
            imageURI = s_highImageURI;
        } else {
            imageURI = s_lowImageURI;
        }

        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":',
                                name(),
                                '", "description": "Mood NFTs", "image": "',
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
