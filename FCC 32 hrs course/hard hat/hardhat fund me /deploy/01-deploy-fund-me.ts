import { HardhatRuntimeEnvironment } from 'hardhat/types'

export default async function deployFunc(hre: HardhatRuntimeEnvironment) {
  console.log('Deploying fund me contract... 🚀')

  const { deployments, getNamedAccounts } = hre
}
