// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

// --------------- ENUMS --------------------
enum RaffleState {
    Open,
    Closed
}

// --------------- Errors --------------------
error Raffle__NotEnoughETHEntered();
error Raffle__TransferFailed();
error Raffle__NotOpen();
error Raffle__UpkeepNotNeeded(
    uint256 balance,
    uint256 playersLength,
    RaffleState state
);


/**
 * @title Raffle
 * @author Zineddine Benkhaled
 * @notice This contract is for creating an untamperable decentralized smart contract lottery
 * @dev This contract uses Chainlink VRF to pick a winner and Chainlink Keeper to automate the process
 */
abstract contract Raffle is VRFConsumerBaseV2, KeeperCompatibleInterface {
    // --------------- State variables --------------------
    uint256 private immutable i_entraceFee;
    address payable[] private s_players;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUM_WORDS = 1;
    uint256 private s_lastTimestamp;
    uint256 private immutable s_interval;

    // --------------- Lottery variables --------------------
    address private s_recentWinner;
    RaffleState private s_raffleState;

    // --------------- Events --------------------
    event RaffleEnter(address indexed player);
    event RequestedRaffleWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);

    // --------------- Constructor --------------------
    constructor(
        address vrfCoordinatorV2,
        uint256 _entranceFee,
        bytes32 _gasLane,
        uint64 _subscriptionId,
        uint32 _callbackGasLimit,
        uint256 _interval
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entraceFee = _entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = _gasLane;
        i_subscriptionId = _subscriptionId;
        i_callbackGasLimit = _callbackGasLimit;
        s_raffleState = RaffleState.Open;
        s_lastTimestamp = block.timestamp;
        s_interval = _interval;
    }

    // --------------- Modifiers --------------------
    function enterRaffle() public payable {
        if (msg.value < i_entraceFee) {
            revert Raffle__NotEnoughETHEntered();
        }

        if (s_raffleState != RaffleState.Open) {
            revert Raffle__NotOpen();
        }

        s_players.push(payable(msg.sender));

        // Inform listeners that a player has entered the raffle
        emit RaffleEnter(msg.sender);
    }

    // --------------- Chainlink VRF --------------------
    // docs: https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number
    function performUpkeep(bytes calldata /* performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        if (!upkeepNeeded) {
            revert Raffle__UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                s_raffleState
            );
        }

        // We used external because we want to call this function from another contract and to save gas
        s_raffleState = RaffleState.Closed;

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
        uint256 /*requestId*/,
        uint256[] memory randomWords
    ) internal override {
        // We used internal because we want to call this function from the Chainlink VRF contract
        // randomWords is an array of 1 element because we set NUM_WORDS to 1 and it will be a number between 0 and 2^256
        // we use the modulo operator to get a number between 0 and the number of players in the raffle to pick a winner
        uint256 winnerIndex = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[winnerIndex];
        s_recentWinner = recentWinner;

        // update the state of the raffle
        s_raffleState = RaffleState.Open;

        // reset the players array
        delete s_players;

        // reset the last timestamp
        s_lastTimestamp = block.timestamp;

        // Transfer the balance of the contract to the winner
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        if (!success) {
            revert Raffle__TransferFailed();
        }
        emit WinnerPicked(recentWinner);
    }

    // --------------- Chainlink Keeper --------------------
    // it will return true if:
    //      1. Our time interval has passed
    //      2. The lottery should have at least 1 player
    //      3. The lottery should be funded with LINK
    //      4. The lottery should be in "open" state (to prevent new players from entering while we pick a winner)
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        public
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        bool isOpen = s_raffleState == RaffleState.Open;
        bool timePassed = ((block.timestamp - s_lastTimestamp) > s_interval);
        bool hasPlayers = s_players.length > 0;
        bool hasBalance = address(this).balance > 0;
        upkeepNeeded = isOpen && timePassed && hasPlayers && hasBalance;

        // after check up keep is finished, if upkeepNeeded is true, we will call performUpkeep automatically by the Chainlink Keeper
    }

    // --------------- Getters --------------------
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
