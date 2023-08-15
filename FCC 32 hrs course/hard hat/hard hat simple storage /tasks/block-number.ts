import { task } from 'hardhat/config'

// task syntax: task(name, [description], asyncFn)
task('block-number', 'Prints the current block number').setAction(
  async (taskArgs: any, hre) => {}
)
