// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SimpleStorage.sol";

contract StorageFacotry {
    SimpleStorage[] public simpleStorageArray;

    // the below function will help to deploy the contract './SimpleStorage.sol'
    function createSimpleStorageContract() public {
        SimpleStorage newSimpleStorage = new SimpleStorage();
        simpleStorageArray.push(newSimpleStorage);
    }

    // the below function will help to interact with the list of deployed contracts
    function sfStore(
        uint256 _simpleStorageIndex,
        uint256 _simpleStorageNumber
    ) public {
        // RULE: to interact with any contract we need 2 things
        // 1. Address of the contract: we can get it from the list of deployed contracts "simpleStorage"
        // 2. ABI of the contract: stands for Application Binary Interface which tells how to interact with the contract (we automatically get it when we import the contract)
        SimpleStorage simpleStorageContract = SimpleStorage(
            simpleStorageArray[_simpleStorageIndex]
        );
        // we are calling the function store from the contract SimpleStorage to save _simpleStorageNumber value into the contract number variable
        simpleStorageContract.store(_simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        return simpleStorageArray[_simpleStorageIndex].getNumber();
    }
}
