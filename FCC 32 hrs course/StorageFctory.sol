// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 number;

    People public zino = People({id: 1, name: "zineddine"});

    People[] public people;

    struct People {
        uint256 id;
        string name;
    }

    mapping(string => uint256) public nameToIdMapping;

    function store(uint256 _number) public {
        number = _number;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    function addPerson(string memory _name, uint256 _id) public {
        People memory newPerson = People(_id, _name);
        people.push(newPerson);

        nameToIdMapping[_name] = _id;
    }
}

contract StorageFacotry {
    // the below function will help to deploy the contract './SimpleStorage.sol'
    function createSimpleStorageContract() public {}
}
