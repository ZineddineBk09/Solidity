// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.7;

error Raffle__NotEnoughETHEntered();

contract Raffle {
    // State variables
    uint256 private immutable i_entraceFee;
    address payable[] private s_players;

    // Events
    event RaffleEnter(address indexed player);

    constructor(uint256 _entranceFee) {
        i_entraceFee = _entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entraceFee) {
            revert Raffle__NotEnoughETHEntered();
        }

        s_players.push(payable(msg.sender));

        // Inform listeners that a player has entered the raffle
        emit RaffleEnter(msg.sender);
    }

    function getEntraceFee() public view returns (uint256) {
        return i_entraceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
