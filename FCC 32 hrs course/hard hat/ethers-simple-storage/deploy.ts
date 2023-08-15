const ethers = require('ethers');
const fs = require('fs-extra');
const dotenv = require('dotenv');
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_ALCHEMY_SEPOLIA_SERVER_URL
  )
  let wallet = new ethers.Wallet(
    process.env.METAMASK_ACCOUNT_PRIVATE_KEY,
    provider
  )

  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8')
  const bin = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8')

  const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
  console.log('Deploying contract...')

  // deploy contract
  const contract = await contractFactory.deploy()

  // wait for contract to be mined and added to the blockchain
  await contract.deploymentTransaction().wait(1)

  const address = await contract.getAddress()
  console.log('Contract deployed to: ', address)

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
