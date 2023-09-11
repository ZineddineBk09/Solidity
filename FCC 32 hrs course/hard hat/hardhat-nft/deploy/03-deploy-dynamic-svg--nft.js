const { network, ethers } = require('hardhat')
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

let tokenUris = [
  'ipfs://QmSpxVwNjU9hxqFH3jGWYn7mKuMADFTuNEXSeoCunDke75',
  'ipfs://Qmb4k7s3SpXkRVKDPgqfqfhcH86GgYmB6czp6PxgmVFmcV',
  'ipfs://Qme6jgeziY61n9hrx3C1E7Cy91GpQoWXhVysUx95pxcPBz',
]

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

  log(
    '========================= Finish Deploying Dynamic SVG NFT ============================='
  )
}

module.exports.tags = ['all', 'randomipfs', 'main']
