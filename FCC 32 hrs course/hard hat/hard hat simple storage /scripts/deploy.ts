import { ethers } from 'hardhat'

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying SimpleStorage...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  const address = await simpleStorage.getAddress()
  console.log('SimpleStorage deployed to:', address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
