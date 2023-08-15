Hardhat Simple Storage Project
==============================

Welcome to the Hardhat Simple Storage project! This repository contains a basic setup for building and testing smart contracts using the Hardhat development environment. The main smart contract in this project is a simple storage contract that allows you to store and retrieve an integer value.

![HardHat](https://www.solodev.com/file/e367330d-e5a7-11ec-b9ad-0eaef3759f5f/Hardhat-Featured-Image-2d7d004b.png)

Quick Start
-----------

Follow these steps to quickly get started with the project:

1.  **Clone the Repository:** Start by cloning this repository to your local machine using the following command:

    bash

-   `git clone https://github.com/ZineddineBk09/Solidity.git`

    -   **Install Dependencies:** Navigate to the project directory and install the required dependencies using Yarn or npm:

    bash

    -   `cd 'FCC 32 hrs course'/'hard hat''/hardhat simple storage'
    yarn install`

    -   **Compile Contracts:** Compile the smart contracts using the following command:

    bash

    -   `yarn hardhat compile`

    -   **Run Tests:** Run the tests to ensure everything is working correctly:

    bash

1.  `yarn hardhat test`

2.  **Explore and Build:** Feel free to explore the `contracts` directory to understand the simple storage contract. You can also build upon this project by adding more contracts and functionalities.

Usage
-----

The following commands can be used with Hardhat to interact with the project:

-   **Compile Contracts:** To compile the smart contracts, use:

    bash

-   `yarn hardhat compile`

    -   **Run Tests:** Run the tests using:

    bash

    -   `yarn hardhat test`

    -   **Flatten Contracts:** To flatten and print contracts and their dependencies, use:

    bash

    -   `yarn hardhat flatten`

    -   **Start JSON-RPC Server:** Start a JSON-RPC server on top of Hardhat Network with:

    bash

    -   `yarn hardhat node`

    -   **Generate Typechain Typings:** Generate Typechain typings for compiled contracts with:

    bash

-   `yarn hardhat typechain`

Testing
-------

The project comes with a set of Mocha tests located in the `test` directory. These tests ensure that the smart contracts are functioning as expected. To run the tests, use the following command:

bash

`yarn hardhat test`

During testing, you can also generate a code coverage report using:

bash

`yarn hardhat coverage`

Additional Notes
----------------

-   **Config File:** The Hardhat configuration file `hardhat.config.ts` contains project-specific settings and configurations.

-   **Network Configuration:** You can specify the network to connect to using the `--network` flag when running tasks. Modify the network configurations in the `hardhat.config.ts` file.

-   **TypeScript Type-Checking:** You can enable TypeScript type-checking of your scripts/tests using the `--typecheck` flag.

-   **Flamegraph Generation:** To generate a flamegraph of your Hardhat tasks, use the `--flamegraph` flag.

-   **Verify Contracts:** You can use the `verify` task to verify a contract on Etherscan.

Feel free to explore and customize this project to suit your needs! If you encounter any issues or have questions, please refer to the [Hardhat documentation](https://hardhat.org/) or seek help from the community.

Happy coding!