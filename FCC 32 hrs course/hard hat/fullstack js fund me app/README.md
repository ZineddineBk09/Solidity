# Full Stack Javascript Fund Me App

Welcome to the Full Stack Fund Me App project! This decentralized application (Dapp) allows users to fund a project with Ethereum (ETH) using MetaMask. This README will guide you through the project structure, setup, and usage.


![Project Logo](assets/fullstack%20js%20fund%20me%20app%2001.png)
![Project Logo](assets/fullstack%20js%20fund%20me%20app%2002.png)

## Table of Contents

- [Project Structure](https://chat.openai.com/c/95227729-e890-475c-a8cd-926c0bd68fe9#project-structure)
- [Getting Started](https://chat.openai.com/c/95227729-e890-475c-a8cd-926c0bd68fe9#getting-started)
  - [Prerequisites](https://chat.openai.com/c/95227729-e890-475c-a8cd-926c0bd68fe9#prerequisites)
  - [Installation](https://chat.openai.com/c/95227729-e890-475c-a8cd-926c0bd68fe9#installation)
- [Usage](https://chat.openai.com/c/95227729-e890-475c-a8cd-926c0bd68fe9#usage)
- [Javascript](https://chat.openai.com/c/95227729-e890-475c-a8cd-926c0bd68fe9#javascript)

## Project Structure

The project consists of the following files:

- `index.html`: The HTML file that defines the structure of the Dapp's user interface.
- `script.js`: The JavaScript file that handles interactions with MetaMask and Ethereum smart contracts.
- `constants.js`: Contains contract ABI and address.

## Getting Started

Follow these steps to set up and run the Fund Me App:

### Prerequisites

Before you begin, ensure you have the following:

- [MetaMask](https://metamask.io/) installed in your browser.

### Installation

1.  Clone the repository to your local machine:

    `git clone https://github.com/ZineddineBk09/Solidity.git`

2.  Open the project directory:

    `cd FCC\ 32\ hrs\ course/hard\ hat/fullstack\ js\ fund\ me\ app/`

3.  Run the following command to install the project dependencies:

    `yarn` or `npm install`

4.  Run the following command to start the local development server:

    `yarn http-server` or `npm run http-server`

5.  Open your browser and navigate to <http://localhost:8080> to view the Dapp.

## Usage

1.  Click the "Connect Wallet" button to connect your MetaMask wallet. If you don't have MetaMask installed, you'll see an alert message prompting you to install it.

2.  Once connected, the button will change to "Connected" with your wallet's address.

3.  Enter the amount of ETH you want to fund in the input field.

4.  Click the "Fund" button to send the transaction to the smart contract.

## Javascript

The `script.js` file contains JavaScript code for interacting with MetaMask and the Ethereum smart contract. Here are the main functions:

- `connect()`: Connects the MetaMask wallet to the Dapp and displays the connected wallet's address.

- `fund()`: Sends a transaction to fund the project with the specified ETH amount. It uses the Ethereum provider, signer, and the smart contract's ABI and address.

- `listenForTxMine(txResponse, provider)`: Listens for the transaction to be mined and resolves when the transaction is confirmed.

- `getBalance()`: Gets the current balance of the smart contract.

- `withdraw()`: Sends a transaction to withdraw the current balance of the smart contract. It uses the Ethereum provider, signer, and the smart contract's ABI and address.


---

You are now ready to use the Full Stack Fund Me App! Feel free to explore and customize this project to suit your needs. If you encounter any issues or have questions, please don't hesitate to reach out for assistance.

Happy funding!

Author: Zineddine Benkhaled 
Contact: [Your Twitter](https://twitter.com/zinobk09) 
[Email](mailto:benkhaledzineddine@gmail.com) 
Project Link: <https://github.com/ZineddineBk09/Solidity/tree/main/FCC%2032%20hrs%20course/hard%20hat/fullstack%20js%20fund%20me%20app>
