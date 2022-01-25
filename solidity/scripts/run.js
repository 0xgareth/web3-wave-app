const main = async () => {
  
  // compiles contract & generates files we need to work w/ contract
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  
  // get hardhat to create local eth network for just this contract - destroyed after script completes
  // everytime you run the contract, a new chain is created
  const waveContract = await waveContractFactory.deploy({value: hre.ethers.utils.parseEther("0.1"),})
  await waveContract.deployed()
  console.log("Contract deployed to:", waveContract.address)

  /*
  * GET CONTRACT BALANCE
  */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /**
   * SEND WAVES
   */
  const waveTxn = await waveContract.wave("This is wave #1")
  await waveTxn.wait() // wait for mining
  const waveTxn2 = await waveContract.wave("This is wave #2")
  await waveTxn2.wait() // wait for mining

  /*
   * GET CONTRACT'S BALANCE AGAIN AFTER WAVE
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

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