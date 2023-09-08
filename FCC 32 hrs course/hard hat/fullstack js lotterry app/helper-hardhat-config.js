// This is just a helper file to help you get started with hardhat-deploy based on the network you're deploying to. You can use this file as a reference to help you get started with your own hardhat-deploy config file.
// In our case we are deploying to the sepolia network, so we need to add the following code to the bottom of the file:

const networkConfig = {
  11155111: {
    name: 'sepolia',
    vrfCoordinatorV2: '0x271682DEB8C4E0901D1a1550aD2e64D568E69909',
  },
}

const developmentChains = ['hardhat', 'localhost']

module.exports = {
  networkConfig,
  developmentChains,
}
