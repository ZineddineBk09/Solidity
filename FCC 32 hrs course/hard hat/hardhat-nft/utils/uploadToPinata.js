const pinataSDK = require('@pinata/sdk')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const pinataApiKey = process.env.PINATA_API_KEY || ''
const pinataApiSecret = process.env.PINATA_API_SECRET || ''
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)

async function storeImages(imagesFilePath) {
  const fullImagesPath = path.resolve(imagesFilePath)
  const files = fs.readdirSync(fullImagesPath)

  console.log('Uploading to Pinata IPFS...⬆️⬆️⬆️⬆️')

  const uploadPromises = files.map(async (file) => {
    const readableStreamForFile = fs.createReadStream(
      fullImagesPath + '/' + file
    )
    const options = {
      pinataMetadata: {
        name: file,
      },
    }

    try {
      const res = await pinata.pinFileToIPFS(readableStreamForFile, options)
      console.log('Uploaded:', file)
      return res
    } catch (err) {
      console.error('Error uploading:', file, err)
      throw err
    }
  })

  try {
    const responses = await Promise.all(uploadPromises)
    console.log('Files Uploaded Successfully ✅✅')
    return { responses, files }
  } catch (error) {
    console.error('Error uploading files:', error)
    return { responses: [], files }
  }
}

async function storeTokenUriMetadata(metadata) {
  try {
    const response = await pinata.pinJSONToIPFS(metadata)
    console.log('Metadata Uploaded Successfully ✅✅')
    return response
  } catch (err) {
    console.error('Error uploading metadata:', err)
  }
}

module.exports = {
  storeImages,
  storeTokenUriMetadata,
}
