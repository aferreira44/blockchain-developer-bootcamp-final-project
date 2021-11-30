const ERC20Contract = artifacts.require("./ERC20Contract.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20Contract, "ERC20", "ERC20");
};