// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCordinatorV2Interface.sol";

error Raffle__NotEnoughETHEntered();

contract Raffle is VRFConsumerBaseV2 {
    // State variables
    uint256 private immutable i_entraceFee;
    address payable[] private s_players;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint256 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant i_callbackGasLimit;

    // Events
    event RaffleEnter(address indexed player);

    constructor(
        address vrfCoordinatorV2,
        uint256 _entranceFee,
        bytes32 _gasLane,
        uint256 _subscriptionId
        uint32 _callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entraceFee = _entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = _gasLane;
        i_subscriptionId = _subscriptionId;
        i_callbackGasLimit = _callbackGasLimit;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entraceFee) {
            revert Raffle__NotEnoughETHEntered();
        }

        s_players.push(payable(msg.sender));

        // Inform listeners that a player has entered the raffle
        emit RaffleEnter(msg.sender);
    }

    // Chainlink VRF
    // docs: https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number
    function pickRandomWinner() external {
        // We used external because we want to call this function from another contract and to save gas
        i_vrfCoordinator.requestRandomWords(
            keyHash, // maximum
            s_subscriptionId,
            REQUEST_CONFIRMATIONS,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {}

    // Getters
    function getEntraceFee() public view returns (uint256) {
        return i_entraceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
