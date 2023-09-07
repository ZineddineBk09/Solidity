// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

error Raffle__NotEnoughETHEntered();
error Raffle__TransferFailed();

contract Raffle is VRFConsumerBaseV2 {
    // State variables
    uint256 private immutable i_entraceFee;
    address payable[] private s_players;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUM_WORDS = 1;

    // Lottery variables
    address private s_recentWinner;

    // Events
    event RaffleEnter(address indexed player);
    event RequestedRaffleWinner(uint256 indexed requestId);

    // Constructor
    constructor(
        address vrfCoordinatorV2,
        uint256 _entranceFee,
        bytes32 _gasLane,
        uint64 _subscriptionId,
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
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );

        emit RequestedRaffleWinner(requestId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        // We used internal because we want to call this function from the Chainlink VRF contract
        // randomWords is an array of 1 element because we set NUM_WORDS to 1 and it will be a number between 0 and 2^256
        // we use the modulo operator to get a number between 0 and the number of players in the raffle to pick a winner
        uint256 winnerIndex = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[winnerIndex];
        s_recentWinner = recentWinner;

        // Transfer the balance of the contract to the winner
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
    }

    // Getters
    function getEntraceFee() public view returns (uint256) {
        return i_entraceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }
}
