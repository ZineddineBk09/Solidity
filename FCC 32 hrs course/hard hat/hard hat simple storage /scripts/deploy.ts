import { ethers, run, network } from 'hardhat'

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying SimpleStorage...🚀')
  const simpleStorage = await SimpleStorageFactory.deploy()
  const address = await simpleStorage.getAddress()
  console.log('SimpleStorage deployed to:', address)

  // check if we're on sepolia testnet and we have an etherscan api key
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    // wait 6 blocks to make sure the contract is mined
    await simpleStorage
    await verify(address, [])
  }
}

async function verify(contractAddress: string, args: any) {
  console.log('Verifying contract on etherscan...📝')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })

    console.log('Contract source code verified 🎉')
  } catch (error: any) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Contract already verified 👍')
      return
    }
    console.error('Verify error 🚨', error)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
