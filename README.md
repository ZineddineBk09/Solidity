# Web3 and Solidity - FreeCodeCamp Course

[comment]: <> (Add a solidity image here :https://www.criptonoticias.com/wp-content/uploads/2021/02/solidity-lenguaje-programacion-actualizacion.jpg)

![Solidity](https://www.criptonoticias.com/wp-content/uploads/2021/02/solidity-lenguaje-programacion-actualizacion.jpg)

## General knowledge

- **Nonce**: transaction count for the account
- **Gas Price**: ptice per unit of gas (wei)
- **Gas Limit**: max gas that can be used for the transaction
- **To**: address of the account to send the transaction to
- **Value**: amount of ether to send (wei)
- **Data**: what to send to the To address
- **V, R, S**: signature of the transaction

## Solidity

- **pragma**: version of the compiler
- **contract**: like a class in OOP
- **constructor**: a function that runs once when the contract is created
- **public**: can be accessed from outside the contract
- **view**: can be called without spending gas
- **pure**: does not read from or modify the state and does not spend gas
- **memory**: temporary place to store data
- **storage**: permanent place to store data
- **mapping**: like a hash table
- **require**: like an if statement
- **msg.sender**: address of the account that called the function
- **msg.value**: amount of ether that was sent along with the function call
- **address(this)**: address of the contract
- **address payable**: address that can send ether
- **modifier**: like a function that is run before the function it is applied to
- **receive function**: a special function in solidity that is run when the contract receives ether without a function call
- **fallback function**: a special function in solidity that is run when the contract receives ether and the function call does not match any other function

### Optimization (Gas Efficiency)

- **immutable**: variables that cannot be changed after the contract is deployed
- **constant**: variables that cannot be changed after the contract is deployed and can be accessed from outside the contract
- **if and custom errors instead of require**: require uses more gas than if statements and custom errors
- **view**: functions that do not change the state of the contract
- **pure**: functions that do not read from or modify the state of the contract
