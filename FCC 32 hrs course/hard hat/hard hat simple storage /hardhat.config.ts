import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'

const RPC_ALCHEMY_SEPOLIA_SERVER_URL =
  process.env.RPC_ALCHEMY_SEPOLIA_SERVER_URL!
const METAMASK_ACCOUNT_PRIVATE_KEY = process.env.METAMASK_ACCOUNT_PRIVATE_KEY!

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    sepolia: {
      url: RPC_ALCHEMY_SEPOLIA_SERVER_URL,
      accounts: [METAMASK_ACCOUNT_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  solidity: '0.8.19',
}

export default config
