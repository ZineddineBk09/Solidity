const { network, ethers } = require('hardhat')
const { developmentChains } = require('../helper-hardhat-config')

module.exports = async function ({ getNamedAccounts }) {
  const { deployer } = await getNamedAccounts()

  // Basic NFT
  const basicNFT = await ethers.getContract('BasicNFT', deployer)
  const basicMintTx = await basicNFT.mintNFT(deployer)
  await basicMintTx.wait(1)
  console.log('Basic NFT minted: ', await basicNFT.tokenURI(0))

  // Random NFT
  const randomNFT = await ethers.getContract('RandomNFT', deployer)
  const mintFee = await randomNFT.getMintFee()

  await new Promise(async (resolve, reject) => {
    setTimeout(resolve, 300000) // 5 minutes
    randomNFT.once('NFTMinted', async () => {
      console.log('Random NFT minted: ', await randomNFT.tokenURI(0))
      resolve()
    })

    const randomNFTMintTx = await randomNFT.requestNFT({
      value: mintFee.toString(),
    })

    const randomNFTMintTxReceipt = await randomNFTMintTx.wait(1)

    if (developmentChains.includes(network.name)) {
      const requestId =
        randomNFTMintTxReceipt.events[1].args.requestId.toString()
      const vrfCoordinatorV2Mock = await ethers.getContract(
        'VRFCoordinatorV2Mock',
        deployer
      )
      await vrfCoordinatorV2Mock.fulfillRandomWords(
        requestId,
        randomNFT.address
      )
    }
  })

  console.log('Random NFT minted: ', await randomNFT.tokenURI(0))

  // Dynamic SVG NFT
  const highValue = ethers.utils.parseEther('2000').toString()
  const dynamigSvgNFT = await ethers.getContract('DynamicSvgNFT', deployer)
  const dynamigSvgNFTMintTx = await dynamigSvgNFT.mintNFT(highValue)
  await dynamigSvgNFTMintTx.wait(1)

  console.log('Dynamic SVG NFT minted: ', await dynamigSvgNFT.tokenURI(0))
}
