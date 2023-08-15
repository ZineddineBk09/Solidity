import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types'

describe('SimpleStorage', () => {
  let SimpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage

  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await SimpleStorageFactory.deploy()
  })

  it('should start with number = 0', async () => {
    const number = await simpleStorage.getNumber()
    expect(number).to.equal('0')
  })

  it('should set number to 1 when we call store', async () => {
    const txResponse = await simpleStorage.store(1)
    const txReceipt = await txResponse.wait(1)
    const currentNumber = await simpleStorage.getNumber()

    expect(currentNumber).to.equal('1')
  })
})

// NOTE: if you want to only run one test, you can use the .only method. e.g.: it.only('...')
