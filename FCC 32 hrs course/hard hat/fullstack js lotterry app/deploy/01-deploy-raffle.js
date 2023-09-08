const { network, ethers } = require('hardhat')
import { developmentChains } from '../helper-hardhat-config'

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  let vrfCoordinatorV2Address

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      'VRFCoordinatorV2Mock'
    )
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
  }

  const raffle = await deploy('Raffle', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
}
