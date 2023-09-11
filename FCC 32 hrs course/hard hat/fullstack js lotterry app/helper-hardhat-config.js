// This is just a helper file to help you get started with hardhat-deploy based on the network you're deploying to. You can use this file as a reference to help you get started with your own hardhat-deploy config file.
// In our case we are deploying to the sepolia network, so we need to add the following code to the bottom of the file:

const { ethers } = require('hardhat')

const networkConfig = {
  default: {
    name: 'hardhat',
    keepersUpdateInterval: '30',
  },
  31337: {
    name: 'localhost',
    subscriptionId: '588',
    gasLane:
      '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c', // 30 gwei
    keepersUpdateInterval: '30',
    raffleEntranceFee: ethers.utils.parseEther('0.01').toString(), // 0.01 ETH
    callbackGasLimit: '500000', // 500,000 gas
  },
  11155111: {
    name: 'sepolia',
    subscriptionId: '6926',
    gasLane:
      '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c', // 30 gwei
    keepersUpdateInterval: '30',
    raffleEntranceFee: ethers.utils.parseEther('0.01').toString(), // 0.01 ETH
    callbackGasLimit: '500000', // 500,000 gas
    vrfCoordinatorV2: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
  },
  1: {
    name: 'mainnet',
    keepersUpdateInterval: '30',
  },
}

const developmentChains = ['hardhat', 'localhost']
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const frontEndContractsFile =
  '../nextjs-smartcontract-lottery-fcc/constants/contractAddresses.json'
const frontEndAbiFile = '../nextjs-smartcontract-lottery-fcc/constants/abi.json'

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndContractsFile,
  frontEndAbiFile,
}