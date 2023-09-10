const { network, ethers } = require('hardhat')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  let vrfCoordinatorV2Address, subscriptionId

  // if we are in localhost network or hardhat network
  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      'VRFCoordinatorV2Mock'
    )
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address

    // create a subscription
    const tx = await vrfCoordinatorV2Mock.createSubscription()
    const txReceipt = await tx.wait(1)
    subscriptionId = txReceipt.events[0].args.subId
  } else {
    // if we are in a public network (sepolia)
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
    subscriptionId = networkConfig[chainId].subscriptionId
  }

  log(
    '========================= Deploying Random NFT ============================='
  )

  const args = [
    vrfCoordinatorV2Address,
    subscriptionId,
    networkConfig[chainId].gasLane,
    networkConfig[chainId].callbackGasLimit,
    // pupTokenUris,
    networkConfig[chainId].mintFee,
  ]
}
