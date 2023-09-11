require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
require('hardhat-deploy')
require('solidity-coverage')
require('hardhat-gas-reporter')
require('hardhat-contract-sizer')
require('dotenv').config()

const SEPOLIA_RPC_URL = process.env.RPC_ALCHEMY_SEPOLIA_SERVER_URL || ''
const PRIVATE_KEY = process.env.METAMASK_ACCOUNT_PRIVATE_KEY || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    sepolia: {
      chainId: 11155111,
      // blockConfirmations represents the number of blocks that need to be mined on top of the block that includes the transaction in order for the transaction to be considered confirmed.
      // we choose 6 because it is the default number of block confirmations for most exchanges
      blockConfirmations: 6,
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
      },
      {
        version: '0.6.6',
      },
    ],
  },
  // we need namedAccounts for the deploy scripts, so we can use the deployer address in the scripts
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
}
