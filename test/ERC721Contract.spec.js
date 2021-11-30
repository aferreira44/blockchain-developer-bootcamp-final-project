const ERC721Contract = artifacts.require("./ERC721Contract.sol");
const BN = web3.utils.BN;

contract("ERC721Contract", (accounts) => {
  let owner = accounts[0];

  let contractERC721Instance;

  let params = {
    name: "ERC721",
    symbol: "$ERC721",
  };

  before(async function () {
    // runs once before the first test in this block
    contractERC721Instance = await ERC721Contract.new(
      params.name,
      params.symbol,
      {
        from: owner,
      }
    );
  });

  // Test cases
  it("...should be able to deploy a new ERC721", async () => {
    // Contract address should be a valid address
    assert.isTrue(
      web3.utils.isAddress(contractERC721Instance.address),
      "The address is a valid address"
    );

    // Contract address should not be an external owned account
    assert.notEqual(
      web3.eth.getCode(contractERC721Instance.address),
      "0x",
      "The contract address is not a contract"
    );
    // TODO: Check if the contract address is from a contractERC721Instance
  });
  it("...should be the message sender the contract owner", async () => {
    assert.equal(
      await contractERC721Instance.owner(),
      owner,
      "Owner account is not the contract owner"
    );
  });
  // xit("...should be able to transfer the ownership", async () => {});
  // xit("...should be able to renounce the ownership", async () => {});
  // Other ERC721 functions (mint, transfer, etc)
});
