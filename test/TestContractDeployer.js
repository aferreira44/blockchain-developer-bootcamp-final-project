const truffleAssert = require("truffle-assertions");
const ContractDeployer = artifacts.require("./ContractDeployer.sol");
const ERC20Contract = artifacts.require("./ERC721Contract.sol");
const ERC721Contract = artifacts.require("./ERC721Contract.sol");
const BN = web3.utils.BN;

contract("ContractDeployer", (accounts) => {
  let owner = accounts[0];

  describe("ContractDeployer", function () {
    let contractDeployerInstance;

    before(async function () {
      // runs once before the first test in this block
      contractDeployerInstance = await ContractDeployer.new({
        from: owner,
      });
    });

    // after(async () => {
    //   await contractDeployerInstance.kill({ from: owner });
    // });

    // Test cases
    it("...should be able to deploy a new ContractDeployer", async () => {
      // Contract address should be a valid address
      assert.isTrue(
        web3.utils.isAddress(contractDeployerInstance.address),
        "The address is a valid address"
      );
      // Contract address should not be an external owned account
      assert.notEqual(
        web3.eth.getCode(contractDeployerInstance.address),
        "0x",
        "The contract address is not a contract"
      );
      // TODO: Check if the contract address is from a contractDeployerInstance
    });
    it("...should be the message sender the contract owner", async () => {
      assert.equal(
        await contractDeployerInstance.owner(),
        owner,
        "Owner account is not the contract owner"
      );
    });
    xit("...should be able to transfer the ownership", async () => {});
    xit("...should be able to renounce the ownership", async () => {});
  });

  describe("ERC20", function () {
    let contractDeployerInstance;
    let contractERC20Instance;

    let contractERC20Params = {
      contractType: "ERC20",
      name: "ERC20",
      symbol: "$ERC20",
    };

    before(async function () {
      // runs once before the first test in this block
      contractDeployerInstance = await ContractDeployer.new({
        from: owner,
      });
      const tx = await contractDeployerInstance.deployContract(
        contractERC20Params.contractType,
        contractERC20Params.name,
        contractERC20Params.symbol
      );

      truffleAssert.eventEmitted(tx, "ContractDeployed", (ev) => {
        erc20address = ev._contractAddress;
        return ev._owner === owner && ev._contractType == 0; // owner, ContractType.ERC20
      });
      contractERC20Instance = await ERC20Contract.at(erc20address);
    });

    // Test cases
    it("...should be able to deploy a new ERC20", async () => {
      // Contract address should be a valid address
      assert.isTrue(
        web3.utils.isAddress(contractDeployerInstance.address),
        "The address is a valid address"
      );

      // Contract address should not be an external owned account
      assert.notEqual(
        web3.eth.getCode(contractDeployerInstance.address),
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
    xit("...should be able to transfer the ownership", async () => {});
    xit("...should be able to renounce the ownership", async () => {});
    // Other ERC20 functions (mint, transfer, etc)
  });

  describe("ERC721", function () {
    let contractDeployerInstance;
    let contractERC721Instance;

    let contractERC721Params = {
      contractType: "ERC721",
      name: "ERC721",
      symbol: "$ERC721",
    };

    before(async function () {
      // runs once before the first test in this block
      contractDeployerInstance = await ContractDeployer.new({
        from: owner,
      });
      const tx = await contractDeployerInstance.deployContract(
        contractERC721Params.contractType,
        contractERC721Params.name,
        contractERC721Params.symbol
      );

      truffleAssert.eventEmitted(tx, "ContractDeployed", (ev) => {
        erc721address = ev._contractAddress;
        return ev._owner === owner && ev._contractType == 1; // owner, ContractType.ERC721
      });
      contractERC721Instance = await ERC721Contract.at(erc721address);
    });

    // Test cases
    it("...should be able to deploy a new ERC721", async () => {
      // Contract address should be a valid address
      assert.isTrue(
        web3.utils.isAddress(contractDeployerInstance.address),
        "The address is a valid address"
      );

      // Contract address should not be an external owned account
      assert.notEqual(
        web3.eth.getCode(contractDeployerInstance.address),
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
    xit("...should be able to transfer the ownership", async () => {});
    xit("...should be able to renounce the ownership", async () => {});
    // Other ERC721 functions (mint, transfer, etc)
  });
});
