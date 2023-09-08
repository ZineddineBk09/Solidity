// Because our Raffle contract has a dependency on the VRF Coordinator contract, we need to deploy the VRF Coordinator contract first. We can do this by adding the following code to the top of the file:
// docs: https://docs.chain.link/vrf/v2/subscription/supported-networks
const { network, ethers } = require('hardhat')
const { developmentChains } = require('../helper-hardhat-config')

const BASE_FEE = ethers.parseEther('0.25') // 0.25 LINK is the premium ==> it costs 0.25 LINK per request
// The gas price link fluctuates based on ETH price, so we need to get the latest gas price link from the network
const GAS_PRICE_LINK = 1e9 // 1 gwei

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
    await deploy('VRFCoordinatorV2Mock', {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    })

    log(
      'VRFCoordinatorV2Mock deployed to:',
      (await deployments.get('VRFCoordinatorV2Mock')).address
    )
    log(
      '==========================================================================================='
    )
  }
}
