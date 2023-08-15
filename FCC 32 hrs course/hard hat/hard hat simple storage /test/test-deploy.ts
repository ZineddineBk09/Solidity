import { ethers, run, network } from 'hardhat'
import { expect } from 'chai'

describe('SimpleStorage', () => {
  let SimpleStorageFactory: any
  let simpleStorage: any

  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await SimpleStorageFactory.deploy()
  })

  it('should start with number = 0', async () => {
    const number = await simpleStorage.getNumber()
    expect(number).to.equal('0')
  })
})
