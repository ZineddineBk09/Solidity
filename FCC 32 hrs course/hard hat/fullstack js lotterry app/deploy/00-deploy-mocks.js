const { network } = require('hardhat')
const { developmentChains } = require('../helper-hardhat-config')

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  // if we're in a local development environment, we want to deploy and log the contract address to the console
  if (developmentChains.includes(network.name)) {
    log(
      "Local network detected! Deploying contracts to local network and printing contract's address to console."
    )
    // deploy a mock vrf coordinator
  }
}
