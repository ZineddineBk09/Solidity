require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-deploy')
require('solidity-coverage')
require('hardhat-gas-reporter')
require('hardhat-contract-sizer')
require('dotenv').config()

const SEPOLIA_RPC_URL = process.env.RPC_ALCHEMY_SEPOLIA_SERVER_URL || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmation: 1,
    },
    sepolia: {
      chainId: 11155111,
      blockConfirmation: 6,

    },
  },
  solidity: '0.8.19',
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
}
