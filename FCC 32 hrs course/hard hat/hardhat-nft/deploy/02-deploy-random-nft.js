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

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let tokenUris

  // get the IPFS hashes of our images, we can do it in 3 ways:
  if (process.env.UPLOAD_TO_PINATA == 'true') {
    tokenUris = await handleTokenUris()
  }
  //    1. we can upload them to IPFS and get the hash. (https://docs.ipfs.io)
  //    2. we can use a service like Pinata (https://pinata.cloud)
  //    3. NFT.storage (https://nft.storage)

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

async function handleTokenUris() {
  const tokenUris = []
  // store the image in IPFS
  // store the metadata in IPFS
  const { responses: images, files } = await storeImages(IMAGES_LOCATION)
  for (imgIndex in images) {
    let tokenUriMetadata = { ...metadataTemplate }
    tokenUriMetadata.name = files[imgIndex].replace('.png', '')
    tokenUriMetadata.description =
      'An adorable ' + tokenUriMetadata.name + ' pup NFT!'
    tokenUriMetadata.image = 'ipfs://' + images[imgIndex].IpfsHash
    console.log('Uploading ' + tokenUriMetadata.name + ' to IPFS...⬆️⬆️⬆️⬆️')

    // store the metadata in IPFS
    const metadtaUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)

    tokenUris.push('ipfs://' + metadtaUploadResponse.IpfsHash)
  }
  console.log('All images and metadata uploaded to IPFS ✅✅')
  console.log('Token URIs:', tokenUris)
  return tokenUris
}

module.exports.tags = ['all', 'randomipfs', 'main']
