import { ethers } from 'ethers'
import * as fs from 'fs-extra'
import 'dotenv/config'

async function encrypt() {
  const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY!)
  const encryptedKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD!)

  console.log('Encrypted Key: ', encryptedKey)

  fs.writeFileSync('./.encryptedKey.json', encryptedKey)
}

encrypt()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Encrypt Function Error: ', error)
    process.exit(1)
  })
