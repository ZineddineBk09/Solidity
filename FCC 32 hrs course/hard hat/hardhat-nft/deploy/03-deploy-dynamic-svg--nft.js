const { network, ethers } = require('hardhat')
const fs = require('fs')
const { developmentChains, networkConfig } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')
const {
  storeImages,
  storeTokenUriMetadata,
} = require('../utils/uploadToPinata')

const IMAGES_LOCATION = './images/randomNFT'
const metadataTemplate = {
  name: '',
  description: '',
  image: '',
  attributes: [
    {
      trait_type: 'Cutness',
      value: 100,
    },
  ],
}

const FUND_AMOUNT = '10000000000000000000' // 10 LINK

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

  const lowSVG = await fs.readFileSync('./images/dynmicNFT/frown.svg', {
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
  })

  log(
    '========================= Finish Deploying Dynamic SVG NFT ============================='
  )
}

module.exports.tags = ['all', 'randomipfs', 'main']
