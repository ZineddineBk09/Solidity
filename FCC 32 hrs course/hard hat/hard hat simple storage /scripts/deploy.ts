import { ethers } from 'hardhat'

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying SimpleStorage...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  const address = await simpleStorage.getAddress()
  console.log('SimpleStorage deployed to:', address)
}

async function verify(contractAddress: string, args: any) {
  // verify contracts after being deployed, it's important to verify contracts because it's the only way to ensure that the contract code is the same as the source code
  const ether_scan_api = 'https://api.etherscan.io/api'
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
