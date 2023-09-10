### Project Name: Random NFT Puppies

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
* * * * *

Description
-----------

A decentralized application (DApp) for minting random NFTs of adorable puppies. This project utilizes Chainlink VRF (Verifiable Random Function) to generate random numbers, which are then used to determine the breed of the puppy NFT. Users can mint these NFTs by paying a minting fee in Ethereum (ETH).

Contracts
---------

### RandomNFT.sol

#### Overview

This smart contract is responsible for minting random NFTs of puppies. It inherits from ERC721, Chainlink's VRFConsumerBaseV2, Ownable, and ERC721URIStorage.

#### Features

-   Users can request the minting of a random puppy NFT by paying a minting fee.
-   Chainlink VRF is used to generate random numbers.
-   The generated random number determines the breed of the puppy (Pug, Shiba Inu, or St. Bernard).
-   The NFT is minted and associated with the user's address.
-   Users can withdraw ETH from the contract.

### Deployment Scripts

#### Mocks Deployment

The project provides deployment scripts for local development and testing. When deploying on a local network, mocks for Chainlink VRF are used.

#### Main Deployment

This script deploys the RandomNFT contract to a specified Ethereum network. It also handles the uploading of images and metadata to IPFS for the NFTs' token URIs.

* * * * *

Getting Started
---------------

### Prerequisites

-   Node.js and npm installed
-   Hardhat development environment

### Installation

1.  Clone the repository:

    bashCopy code

    `git clone https://github.com/your-username/random-nft-project.git
    cd random-nft-project`

2.  Install project dependencies:

    bashCopy code

    `npm install`

### Configuration

-   Create a `.env` file in the project root directory and add your environment variables. For example:

    makefileCopy code

    `PINATA_API_KEY=your-pinata-api-key
    PINATA_API_SECRET=your-pinata-api-secret
    ETHERSCAN_API_KEY=your-etherscan-api-key
    UPLOAD_TO_PINATA=true`

    Replace `your-pinata-api-key`, `your-pinata-api-secret`, and `your-etherscan-api-key` with your actual API keys.

### Usage

-   To deploy the project on a local network for testing, use the following command:

    bashCopy code

    `npx hardhat deploy --network localhost`

-   To deploy the project on a public Ethereum network, modify the network configuration in the deployment scripts and use:

    bashCopy code

    `npx hardhat deploy --network mainnet`

-   Interact with the deployed contract using Hardhat's console or integrate it into your DApp.

### Verify Contracts

-   To verify the deployed contracts on Etherscan, you can use the following command:

    bashCopy code

    `npx hardhat verify --network mainnet <contract-address>`

    Replace `<contract-address>` with the actual address of the contract.

### Testing

-   Run tests using:

    bashCopy code

    `npx hardhat test`

### Deployment

-   Deploy the RandomNFT contract using the deployment scripts.

* * * * *

License
-------

This project is licensed under the MIT License.

* * * * *

Acknowledgments
---------------

-   Chainlink VRF for providing randomness in a decentralized manner.
-   OpenZeppelin for ERC721 and Ownable smart contract templates.
-   IPFS for decentralized storage of token URIs.

* * * * *

Contact Information
-------------------

For inquiries and support, please contact [Zineddine Benkhaled](mailto:benkhaledzineddine@gmail.com).

* * * * *

### Disclaimer

This project is for educational purposes only and should not be used in production without proper security audits and considerations.