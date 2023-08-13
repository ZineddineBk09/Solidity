// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SimpleStorage.sol";

contract StorageFacotry {
    SimpleStorage[] public simpleStorage;

    // the below function will help to deploy the contract './SimpleStorage.sol'
    function createSimpleStorageContract() public {
        SimpleStorage newSimpleStorage = new SimpleStorage();
        simpleStorage.push(newSimpleStorage);
    }

    // the below function will help to interact with the list of deployed contracts
    function sfStore(
        uint256 _simpleStorageIndex,
        uint256 _simpleStorageNumber
    ) public {
        // RULE: to interact with any contract we need 2 things
        // 1. Address of the contract: we can get it from the list of deployed contracts
        // 2. ABI of the contract: stands for Application Binary Interface which tells how to interact with the contract
    }
}
