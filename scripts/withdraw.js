const main = async () => {
    const [owner, thiefCoder] = await hre.ethers.getSigners();
    const nftContractFactory = await hre.ethers.getContractFactory('MissingMinotaur');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
  
    console.log("Contract owner:", owner.address);
  
    // Let's be extra generous with our payment (we're paying more than required)
    let txn = await nftContract.mintNFT({value: hre.ethers.utils.parseEther('1000')});
    await txn.wait();
  
    // How much money is in here?
    const balance = await hre.ethers.provider.getBalance(nftContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  
    // Quick! Grab the funds from the contract! (as thiefCoder)
    try {
      txn = await nftContract.connect(thiefCoder).withdraw();
      await txn.wait();
    } catch(error){
      console.log("Could not rob contract");
    }
  
    // Let's look in their wallet so we can compare later
    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

    // Now let's withdraw from the contract (as owner)
    txn = await nftContract.connect(owner).withdraw();
    await txn.wait();
    
    // Fetch balance of contract & owner
    const contractBalance = await hre.ethers.provider.getBalance(nftContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  
    console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  