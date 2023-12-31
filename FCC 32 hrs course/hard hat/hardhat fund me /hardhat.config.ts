import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
import '@nomicfoundation/hardhat-verify'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@typechain/hardhat'
import 'hardhat-deploy'
// the way "hardhat-deploy" works is when you run hardhat deploy, it will run all the files in the "deploy" folder, so it's good practice to number them in the order you want them to run

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''
const SEPOLIA_RPC_URL = process.env.RPC_ALCHEMY_SEPOLIA_SERVER_URL || ''
const PRIVATE_KEY = process.env.METAMASK_ACCOUNT_PRIVATE_KEY || ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  mocha: {
    timeout: 500000,
  },
  solidity: '0.8.19',
}

export default config
