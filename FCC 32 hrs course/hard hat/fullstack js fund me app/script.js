import { ethers } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js'
import { abi, contractAddress } from './constants.js'

const connectBtn = document.getElementById('connect-button')
const fundBtn = document.getElementById('fund-button')
const fundInput = document.getElementById('fund-input')
const balance = document.getElementById('balance')
const refreshBtn = document.getElementById('refresh-balance')
const withdrawBtn = document.getElementById('withdraw-button')

connectBtn.onclick = connect
fundBtn.onclick = fund
refreshBtn.onclick = getBalance
withdrawBtn.onclick = withdraw

async function connect() {
  if (typeof window.ethereum !== 'undefined') {
    // after the page loads, ask the user to connect their metamask wallet if they approve we can then send requests to their wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log('connected to metamask')

    connectBtn.innerHTML =
      'Connected' +
      '<br>' +
      window.ethereum.selectedAddress.slice(0, 6) +
      '...' +
      window.ethereum.selectedAddress.slice(-4)
  } else {
    // if the user doesn't have metamask installed, show them a message to install it
    alert('Please install MetaMask to use this dApp!')
  }
}

async function fund() {
  const ethAmount = fundInput.value

  if (!ethAmount) return alert('Please enter an amount to fund!')

  console.log('funding project with ' + ethAmount + ' ETH')
  if (typeof window.ethereum !== 'undefined') {
    // To send a transaction we need:
    // 1. connection to the blockchain
    // 2. a wallet with ETH in it
    // 3. a smart contract address that we want to interact with ==> ABI + address

    // provider is a connection to the blockchain
    const provider = new ethers.BrowserProvider(window.ethereum)

    // signer is a wallet with ETH in it (in this case the user's metamask wallet)
    const signer = await provider.getSigner()

    // create a new contract instance (for the FundMe contract on the Sepolia testnetfix)
    const contract = new ethers.Contract(contractAddress, abi, signer)

    // Transactions
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      })

      await listenForTxMine(transactionResponse, provider)
      console.log('Transaction complete!')
      alert('Transaction completed successfully  🎉🎉')
      fundInput.value = ''
      await getBalance()
    } catch (error) {
      console.log(error)
    }
  }
}

function listenForTxMine(txResponse, provider) {
  console.log('Mining ' + txResponse.hash + '...')

  return new Promise((resolve, reject) => {
    //listen for when the transaction is mined
    provider.once(txResponse.hash, (receipt) => {
      console.log('Mined ' + txResponse.hash + '!')
      console.log(receipt)
      resolve(receipt)
    })
  })
}

async function getBalance() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const eth = await provider.getBalance(contractAddress)
    console.log('Ether balance: ' + ethers.formatEther(eth))
    balance.innerHTML = ethers.formatEther(eth).slice(0, 5)
  }
}

async function withdraw() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      const transactionResponse = await contract.withdraw()
      await listenForTxMine(transactionResponse, provider)
      console.log('Withdraw complete!')
      alert('Withdraw completed successfully  🎉🎉')
      await getBalance()
    } catch (error) {
      console.log(error)
    }
  }
}

await getBalance().then(() => {
  // if the funds==0 hide the withdraw button
  if (balance.innerHTML == 0) {
    withdrawBtn.style.display = 'none'
  }
})
