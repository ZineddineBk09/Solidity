import { ethers, run, network } from 'hardhat'

describe('SimpleStorage', () => {
  let simpleStorage: any

  beforeEach(async () => {
    simpleStorage = await ethers
      .getContractFactory('SimpleStorage')
      .then((factory) => {
        return factory.deploy()
      })
  })
})
