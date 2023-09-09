const { network, ethers } = require('hardhat')
import { developmentChains, networkConfig } from '../helper-hardhat-config'

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let vrfCoordinatorV2Address, subscriptionId
  const entranceFee = networkConfig[chainId]['entranceFee']
  const gasLane = networkConfig[chainId]['gasLane']

  // check if we're in a local development environment
  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      'VRFCoordinatorV2Mock'
    )
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address

    const txResponse = await vrfCoordinatorV2Mock.createSubscription()
    const txReceipt = await txResponse.wait(1)
    subscriptionId=txReceipt.events[0].args[0].subId
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId]['vrfCoordinatorV2']
  }

  const raffle = await deploy('Raffle', {
    from: deployer,
    args: [vrfCoordinatorV2Address, entranceFee, gasLane],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
}
