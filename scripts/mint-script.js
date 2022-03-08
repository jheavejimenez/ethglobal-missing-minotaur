const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('MissingMinotaur');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.mintNFT({value: hre.ethers.utils.parseEther('10')});
  // Wait for it to be mined.
  await txn.wait()
 
  txn = await nftContract.mintNFT({value: hre.ethers.utils.parseEther('10')});
  await txn.wait()

  console.log("Minted NFT");

  // How much money is in here?
  const balance = await hre.ethers.provider.getBalance(nftContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

};

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
