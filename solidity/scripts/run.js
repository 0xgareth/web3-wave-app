const main = async () => {
  
  // compiles contract & generates files we need to work w/ contract
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  
  // get hardhat to create local eth network for just this contract - destroyed after script completes
  // everytime you run the contract, a new chain is created
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()
  
  console.log("Contract deployed to:", waveContract.address)

  let waveCount;
  waveCount = await waveContract.getTotalWaves()
  console.log(waveCount.toNumber())

  /**
   * SEND WAVES
   */
  let waveTxn = await waveContract.wave("A test message")
  await waveTxn.wait() // wait for mining
  
  const [_, randomPerson] = await hre.ethers.getSigners()
  waveTxn = await waveContract.connect(randomPerson).wave("Another test message")
  await waveTxn.wait()

  let allWaves = await waveContract.getAllWaves()
  console.log(allWaves)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()