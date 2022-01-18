const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners()
  // compiles contract & generates files we need to work w/ contract
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  // get hardhat to create local eth network for just this contract - destroyed after script completes
  // everytime you run the contract, a new chain is created
  const waveContract = await waveContractFactory.deploy()
  // wait for contract to deploy to the chain
  await waveContract.deployed()
  // gives address of contract on chain
  console.log("Contract deployed to:", waveContract.address)
  // gives address of user that executed contract
  console.log("Contract deployed by:", owner.address)

  let waveCount;
  let wavesPerUser;
  waveCount = await waveContract.getTotalWaves()

  let waveTxn = await waveContract.wave()
  await waveTxn.wait()
  
  waveCount = await waveContract.getTotalWaves()
  wavesPerUser = await waveContract.getWavesPerUser()

  // 1 simulate an additional call to wave
  waveTxn = await waveContract.connect(randomPerson).wave()
  await waveTxn.wait()

  waveCount = await waveContract.getTotalWaves()
  wavesPerUser = await waveContract.connect(randomPerson).getWavesPerUser()

  // 2 simulate an additional call to wave
  waveTxn = await waveContract.connect(randomPerson).wave()
  await waveTxn.wait()

  waveCount = await waveContract.getTotalWaves()
  wavesPerUser = await waveContract.connect(randomPerson).getWavesPerUser()

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