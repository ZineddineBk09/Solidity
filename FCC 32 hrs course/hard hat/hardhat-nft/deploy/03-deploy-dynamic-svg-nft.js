const { network, ethers } = require('hardhat')
const fs = require('fs')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let ethUsdPriceFeedAddress

  if (developmentChains.includes(network.name)) {
    const EthUsdAggregator = await ethers.getContract('MockV3Aggregator')
    ethUsdPriceFeedAddress = EthUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
  }

  const lowSVG = await fs.readFileSync('./images/dynamicNFT/frown.svg', {
    encoding: 'utf8',
  })
  const highSVG = await fs.readFileSync('./images/dynamicNFT/happy.svg', {
    encoding: 'utf8',
  })

  args = [ethUsdPriceFeedAddress, lowSVG, highSVG]

  const dynamigSvgNFT = await deploy('DynamicSvgNFT', {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log('Verifying...⌛⌛')
    await verify(dynamigSvgNFT.address, args)
  }

  log(
    '========================= Finish Deploying Dynamic SVG NFT ============================='
  )
}

module.exports.tags = ['all', 'dynamicsvg', 'main']
