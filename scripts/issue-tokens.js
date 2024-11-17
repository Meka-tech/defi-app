const DecentalBank = artifacts.require("DecentralBank");

module.exports = async function issueRewards(callback) {
  let decentralBank = await DecentalBank.deployed();
  await decentralBank.issueTokens();
  console.log("Tokens issued successfully!");
  callback();
};
