const ethers = require('ethers')
const fs = require('fs-extra')
const dotenv = require('dotenv')
dotenv.config()

const RPC_SERVER_URL = 'http://127.0.0.1:7545'

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_SERVER_URL)
  const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, provider)

  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8')
  const bin = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8')

  // const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
  // // deploy contract
  // const contract = await contractFactory.deploy()
  // const transactionReceipt = await contract.deploymentTransaction().wait(1)

  const nonce = await wallet.getNonce()
    console.log('nonce', nonce)
  const tx = {
    nonce: nonce,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: '0x60806040526040518060400160405280600181526020016040518060400160405280600981526020017f7a696e656464696e650000000000000000000000000000000000000000000000815250815250600160008201518160000155602082015181600101908051906020019061007792919061008c565b50505034801561008657600080fd5b50610190565b8280546100989061012f565b90600052602060002090601f0160209004810192826100ba5760008555610101565b82601f106100d357805160ff1916838001178555610101565b82800160010185558215610101579182015b828111156101005782518255916020019190600101906100e5565b5b50905061010e9190610112565b5090565b5b8082111561012b576000816000905550600101610113565b5090565b6000600282049050600182168061014757607f821691505b6020821081141561015b5761015a610161565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61083b8061019f6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80630913a80b1461006757806321c7eff8146100975780636057361d146100b65780636f760f41146100d25780639e7a13ad146100ee578063f2c9ecd81461011f575b600080fd5b610081600480360381019061007c9190610492565b61013d565b60405161008e91906105f4565b60405180910390f35b61009f61016b565b6040516100ad92919061060f565b60405180910390f35b6100d060048036038101906100cb9190610537565b610205565b005b6100ec60048036038101906100e791906104db565b61020f565b005b61010860048036038101906101039190610537565b6102a5565b60405161011692919061060f565b60405180910390f35b610127610361565b60405161013491906105f4565b60405180910390f35b6004818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600180600001549080600101805461018290610708565b80601f01602080910402602001604051908101604052809291908181526020018280546101ae90610708565b80156101fb5780601f106101d0576101008083540402835291602001916101fb565b820191906000526020600020905b8154815290600101906020018083116101de57829003601f168201915b5050505050905082565b8060008190555050565b60006040518060400160405280838152602001848152509050600381908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061027a92919061036a565b5050508160048460405161028e91906105dd565b908152602001604051809103902081905550505050565b600381815481106102b557600080fd5b90600052602060002090600202016000915090508060000154908060010180546102de90610708565b80601f016020809104026020016040519081016040528092919081815260200182805461030a90610708565b80156103575780601f1061032c57610100808354040283529160200191610357565b820191906000526020600020905b81548152906001019060200180831161033a57829003601f168201915b5050505050905082565b60008054905090565b82805461037690610708565b90600052602060002090601f01602090048101928261039857600085556103df565b82601f106103b157805160ff19168380011785556103df565b828001600101855582156103df579182015b828111156103de5782518255916020019190600101906103c3565b5b5090506103ec91906103f0565b5090565b5b808211156104095760008160009055506001016103f1565b5090565b600061042061041b84610664565b61063f565b90508281526020810184848401111561043c5761043b6107ce565b5b6104478482856106c6565b509392505050565b600082601f830112610464576104636107c9565b5b813561047484826020860161040d565b91505092915050565b60008135905061048c816107ee565b92915050565b6000602082840312156104a8576104a76107d8565b5b600082013567ffffffffffffffff8111156104c6576104c56107d3565b5b6104d28482850161044f565b91505092915050565b600080604083850312156104f2576104f16107d8565b5b600083013567ffffffffffffffff8111156105105761050f6107d3565b5b61051c8582860161044f565b925050602061052d8582860161047d565b9150509250929050565b60006020828403121561054d5761054c6107d8565b5b600061055b8482850161047d565b91505092915050565b600061056f82610695565b61057981856106a0565b93506105898185602086016106d5565b610592816107dd565b840191505092915050565b60006105a882610695565b6105b281856106b1565b93506105c28185602086016106d5565b80840191505092915050565b6105d7816106bc565b82525050565b60006105e9828461059d565b915081905092915050565b600060208201905061060960008301846105ce565b92915050565b600060408201905061062460008301856105ce565b81810360208301526106368184610564565b90509392505050565b600061064961065a565b9050610655828261073a565b919050565b6000604051905090565b600067ffffffffffffffff82111561067f5761067e61079a565b5b610688826107dd565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b838110156106f35780820151818401526020810190506106d8565b83811115610702576000848401525b50505050565b6000600282049050600182168061072057607f821691505b602082108114156107345761073361076b565b5b50919050565b610743826107dd565b810181811067ffffffffffffffff821117156107625761076161079a565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6107f7816106bc565b811461080257600080fd5b5056fea2646970667358221220abc9df99d71e8c64082b026ecc2741b4bce94011e68e2a349aaddcaf33a810f664736f6c63430008070033',
    chainId: 1337,
  }

  // sign the trasaction with the wallet private key to make it appear like the transaction came from the wallet
  //const signedTxResponse = await wallet.signTransaction(tx)

  const sentTxResponse = await wallet.sendTransaction(tx)
  // wait for 1 confirmation on the blockchain
  await sentTxResponse.wait(1)
  console.log('Signed tx:', sentTxResponse)
}

main()
