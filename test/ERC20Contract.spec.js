const ERC20Contract = artifacts.require("./ERC20Contract.sol");
const BN = web3.utils.BN;

contract("ERC20Contract", (accounts) => {
  let owner = accounts[0];

  let contractERC20Instance;

  const params = {
    name: "ERC20",
    symbol: "$ERC20",
  };

  beforeEach(async function () {
    // runs once before the first test in this block
    contractERC20Instance = await ERC20Contract.new(
      params.name,
      params.symbol,
      {
        from: owner,
      }
    );
  });

  // Test cases
  it("...should be able to deploy a new ERC20", async () => {
    // Contract address should be a valid address
    assert.isTrue(
      web3.utils.isAddress(contractERC20Instance.address),
      "The address is a valid address"
    );

    // Contract address should not be an external owned account
    assert.notEqual(
      web3.eth.getCode(contractERC20Instance.address),
      "0x",
      "The contract address is not a contract"
    );
    // TODO: Check if the contract address is from a contractERC20Instance
  });
  it("...should be the message sender the contract owner", async () => {
    assert.equal(
      await contractERC20Instance.owner(),
      owner,
      "Owner account is not the contract owner"
    );
  });
  it("...should has 1000 tokens as total supply", async () => {
    assert.equal(
      web3.utils.fromWei(await contractERC20Instance.totalSupply(), "ether"),
      1000,
      "Total supply is not 1000"
    );
  });
  it("...should be able to mint tokens", async () => {
    const amount = "100";
    await contractERC20Instance.mint(accounts[1], web3.utils.toWei(amount), {
      from: owner,
    });

    assert.equal(
      web3.utils.fromWei(await contractERC20Instance.balanceOf(accounts[1]), "ether"),
      amount,
      "The amount is not equal to 100"
    );
  });
  it("...should be able to transfer tokens", async () => {
    const amount = "100";

    await contractERC20Instance.transfer(accounts[1], web3.utils.toWei(amount), {
      from: owner,
    });

    assert.equal(
      web3.utils.fromWei(await contractERC20Instance.balanceOf(accounts[1]), "ether"),
      amount,
      "The amount is not equal to 100"
    );
  });
});
