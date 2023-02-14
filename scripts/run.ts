const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory(
      "WavePortal"
    );
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
    await waveContract.getTotalWaves();

    const waveTxn = await waveContract.wave("A message");
    await waveTxn.wait();
    const waveTxn_2 = await waveContract.connect(randomPerson).wave("Another message!");
    await waveTxn_2.wait();
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
    await waveContract.getTotalWaves();
}


const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
 runMain();
