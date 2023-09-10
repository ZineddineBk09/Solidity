// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ----------------- Enums -----------------
enum Breed {
    PUG,
    SHIBA_INU,
    ST_BERNARD
}

abstract contract RandomNFT is VRFConsumerBaseV2, ERC721URIStorage {
    // when we mint an NFT, we will trigger chainlink VRF to get us a random number
    // using that number we will get a random NFT of #: Shiba Inu, Pug, St. Bernard
    // Pug: super rare, Shiba: sort of rare, and St. Bernard: common

    // users have to pay to mint an NFT
    // the owner of the contract can withdraw the ETH

    // ----------------- State Variables -----------------
    VRFCoordinatorV2Interface private immutable i_vrfCoordinatorV2;
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3; // 3 is the minimum
    uint32 private constant NUM_WORDS = 1; // number of random values returned

    // ----------------- VRF Helpers -----------------
    // Because fullfillRandomWords will be called by the chailink VRF node, we can't mint the NFT directly inside of it, because if we did the VRF node will be the owner of the NFT.
    // To solve this issue, we will create a mapping of requestId to address, and then inside of fullfillRandomWords we will mint the NFT to the address that is mapped to the requestId
    mapping(uint256 => address) private s_requestIdToSender;

    // ----------------- NFT Variables -----------------
    uint256 public s_tokenCounter;
    uint256 internal constant MAX_CHANCE = 100;
    string[] internal s_pupTokenUris;

    // ----------------- Constructor -----------------
    constructor(
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane,
        uint32 callbackGasLimit,
        string[3] memory pupTokenUris
    ) VRFConsumerBaseV2(vrfCoordinatorV2) ERC721("MeanPuppies", "MEANPUP") {
        i_vrfCoordinatorV2 = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_subscriptionId = subscriptionId;
        i_gasLane = gasLane;
        i_callbackGasLimit = callbackGasLimit;
        s_tokenCounter = 0;
        s_pupTokenUris = pupTokenUris;
    }


    // ----------------- Functions -----------------
    function requestNFT() public returns (uint256 requestId) {
        requestId = i_vrfCoordinatorV2.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );

        s_requestIdToSender[requestId] = msg.sender;
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        address owner = s_requestIdToSender[requestId];
        uint256 newTokenId = s_tokenCounter;

        // get a random number between 0-99
        uint256 chance = randomWords[0] % MAX_CHANCE; // 0-99
        Breed breed = getBreed(chance);

        // Mint the NFT
        _safeMint(owner, newTokenId);
        _setTokenURI(newTokenId, s_pupTokenUris[uint256(breed)]); // uint256(breed)= 0, 1, 2
    }

    function getBreed(uint256 chance) public pure returns (Breed) {
        uint256 i = chance < 10 ? 0 : chance < 30 ? 1 : 2;
        return Breed(i);
    }

    function tokenURI(uint256) public view override returns (string memory) {}
}
