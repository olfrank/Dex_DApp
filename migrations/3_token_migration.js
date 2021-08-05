const ADA = artifacts.require("ADA");
const LINK = artifacts.require("LINK");
const VET = artifacts.require("VET");


const Dex = artifacts.require("Dex");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ADA);
  await deployer.deploy(LINK);
  await deployer.deploy(VET);
  
  let dex = await Dex.deployed();
  let ada = await ADA.deployed();
  let link = await LINK.deployed();
  let vet = await VET.deployed();

  dex.addToken(web3.utils.fromUtf8("ADA"), ada.address);
  dex.addToken(web3.utils.fromUtf8("LINK"), link.address);
  dex.addToken(web3.utils.fromUtf8("VET"), vet.address);

  await ada.approve(dex.address, 500);
  await link.approve(dex.address, 500);
  await vet.approve(dex.address, 500);

  await dex.deposit(100, web3.utils.fromUtf8("ADA"));
  let balanceOfADA = await dex.balances(accounts[0], web3.utils.fromUtf8("ADA"));
  console.log(balanceOfADA);
  await dex.deposit(100, web3.utils.fromUtf8("LINK"));
  let balanceOfLINK = await dex.balances(accounts[0], web3.utils.fromUtf8("LINK"));
  console.log(balanceOfLINK);
  await dex.deposit(100, web3.utils.fromUtf8("VET"));
  let balanceOfVET = await dex.balances(accounts[0], web3.utils.fromUtf8("VET"));
  console.log(balanceOfVET);
};
