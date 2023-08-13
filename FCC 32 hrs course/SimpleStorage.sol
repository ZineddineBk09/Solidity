// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18; // any version >= 0.8.18

  contract SimpleStorage {
      // the 5 most used used variables types:
      // bool (bayna), string, uint (positive integer), int (positive or negative integer), address (a wallet address), bytes

      // example:
      // NB: you want to be explicit with you variables size (ex: uint256 instead of just uint)
      uint256 number; // will get initialized to 0 if we didn't give it a value

      // Objects
      People public zino = People({id: 1, name: "zineddine"});

      // Arrays
      People[] public people;

      struct People {
          uint256 id;
          string name;
      }

      // Mapping: a key-value store
      mapping(string => uint256) public nameToIdMapping;

      function store(uint256 _number) public {
          number = _number;
      }

      /*
      In Solidity, a view function is a function that only reads the state variables of the contract, but does not modify them. A pure function is a function that does not read or modify the state variables of the contract.

      The difference between a view function and a pure function is that a view function can read the state variables of the contract, while a pure function cannot. This means that a view function can be used to get information about the state of the contract, while a pure function can only be used to perform calculations.

      View functions and pure functions are important for gas efficiency. When a function is called, it costs gas to execute the function. View functions and pure functions cost less gas to execute than functions that modify the state of the contract. This is because the Ethereum Virtual Machine (EVM) does not need to store the changes to the state variables for view functions and pure functions.
      */
      function getNumber() public view returns (uint256) {
          return number;
      }

      /*
        we have 6 places to store data:
        1. storage: permanent storage of the contract (ex: state variables) --> the variable will exist as long as the contract exists (ex: uint256 number)
        2. memory: temporary storage (ex: function arguments) --> the variable will exist temporarily while the function is being called
        3. stack: local variables of value types (ex: uint, bool, etc)
        4. calldata: similar to memory, but read-only and only available to external functions (ex: function arguments prefixed with calldata) --> the variable will exist temporarily while the function is being called, but it's read-only and only available to external functions
        5. code: read-only access to the contract's code (ex: msg.sender)
        6. logs: special data location that stores log arguments (ex: events)
      */
      // we only specify memory for _name because solidity knowd that uint256 will be in memory but string is more complex because it is an array of characters and solidity needs to know where to store it
      function addPerson(string memory _name, uint256 _id) public {
          People memory newPerson = People(_id, _name);
          people.push(newPerson);

          nameToIdMapping[_name] = _id;
      }
  }
