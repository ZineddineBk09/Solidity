import { task } from 'hardhat/config'

// task syntax: task(name, [description], asyncFn)
task('block-number', 'Prints the current block number').setAction(
  async (taskArgs: any, hre) => {
    // taskArgs: an object with the arguments passed to the task via the CLI.
    // hre: the Hardhat Runtime Environment. when running a task, you have access to all the plugins and your Hardhat config.
    await hre.ethers.provider.getBlockNumber().then((blockNumber: number) => {
      console.log('Current block number: ' + blockNumber)
    })
  }
)
