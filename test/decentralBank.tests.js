const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentalBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    //load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentalBank.new(rwd.address, tether.address);

    // transfer all tokens to DecentralBank (1 Million)
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    //transfer 100 Tether tokens to investor
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("Mock Tether Deployment Deployment", async () => {
    it("matches name successfully", async () => {
      let name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("Reward Token Deployment", async () => {
    it("matches name successfully", async () => {
      let name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      let name = await decentralBank.name();
      assert.equal(name, "Decentral Bank");
    });
    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield Farming", async () => {
    it("rewards token for staking", async () => {
      let result;

      // check customer balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock tether balance before staking"
      );

      //check staking for customer of 100 tokens
      //simulate approval to deposit
      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer
      });
      await decentralBank.depositTokens(tokens("100"), { from: customer });

      //check updated customer balance
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("0"),
        "customer mock tether balance before staking"
      );
      // check updated decentral bank balance
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "decentral bank tether balance after staking for customer"
      );
      // is staking
      result = await decentralBank.isStaking(customer);
      assert.equal(result, true, "customer is staking");

      //issue token
      await decentralBank.issueTokens({ from: owner });

      //only owner can issue tokens
      await decentralBank.issueTokens({ from: customer }).should.be.rejected;

      //unstake token
      await decentralBank.unstakeTokens({ from: customer });

      //check unstaking balances
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock tether balance after unstaking"
      );
      // check updated decentral bank balance
      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "decentral bank tether balance after unstaking for customer"
      );
      // is staking update
      result = await decentralBank.isStaking(customer);
      assert.equal(
        result,
        false,
        "customer is no longer staking after unstaking"
      );
    });
  });
});
