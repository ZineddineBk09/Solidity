// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SimpleStorage.sol";

// ExtraStorage inherits all the public and external functions of SimpleStorage
contract ExtraStorage is SimpleStorage {
    // override store function
    function store(uint256 _number) public override {
        number = _number + 5;
    }
}
