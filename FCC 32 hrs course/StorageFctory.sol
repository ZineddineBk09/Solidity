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
}
