const { run } = reauire('hardhat')

export const verify = async (contractAddress, args) => {
  console.log('Verifying contract...⌛⌛')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified ✅✅ ')
    } else {
      console.log('Failed to verify ❌❌ ')
      console.log(e)
    }
  }
}
