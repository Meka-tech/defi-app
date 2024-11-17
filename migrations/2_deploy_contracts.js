const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentalBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
  // deploy mock tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  // deploy RWD contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  // deploy decentralbank contract
  await deployer.deploy(DecentalBank, rwd.address, tether.address);
  const decentalBank = await DecentalBank.deployed();

  //transfer all rwd tokens to the decentral bank
  await rwd.transfer(decentalBank.address, "1000000000000000000000000");

  //distribute 100 tether tokens to investor
  await tether.transfer(accounts[1], "100000000000000000000");
};
