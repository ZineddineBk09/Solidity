import { ethers } from 'ethers'
import * as fs from 'fs-extra'
import 'dotenv/config'

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_SERVER_URL)
  // const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, provider) :old way
  const encryptedKey = fs.readFileSync('./.encryptedKey.json', 'utf8')
  let wallet = ethers.Wallet.fromEncryptedJsonSync(
    encryptedKey,
    process.env.PRIVATE_KEY_PASSWORD!
  )
  wallet = wallet.connect(provider)

  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8')
  const bin = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8')

  const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
  console.log('Deploying contract...')

  // deploy contract
  const contract: any = await contractFactory.deploy()

  // wait for contract to be mined and added to the blockchain
  await contract.deploymentTransaction().wait(1)

  const number = await contract.getNumber()

  console.log('Number: ', number.toString())

  // update number
  const transactionResponse = await contract.store('10')
  const transactionReceipt = await transactionResponse.wait(1)
  const newNumber = await contract.getNumber()
  console.log('Updated number: ', newNumber)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Main Function Error: ', error)
    process.exit(1)
  })
