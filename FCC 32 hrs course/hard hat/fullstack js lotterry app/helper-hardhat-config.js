// This is just a helper file to help you get started with hardhat-deploy based on the network you're deploying to. You can use this file as a reference to help you get started with your own hardhat-deploy config file.
// In our case we are deploying to the sepolia network, so we need to add the following code to the bottom of the file:

const { ethers } = require('hardhat')

const networkConfig = {
  11155111: {
    name: 'sepolia',
    vrfCoordinatorV2: '0x271682DEB8C4E0901D1a1550aD2e64D568E69909',
    entraceFee: ethers.utils.parseEther('0.01'),
    gasLane:
      '0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef',
    subscriptionId: '1',
  },
  31337: {
    name: 'hardhat',
    entraceFee: ethers.utils.parseEther('0.01'),
    gasLane:
      '0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef',
  },
}

const developmentChains = ['hardhat', 'localhost']

module.exports = {
  networkConfig,
  developmentChains,
}
