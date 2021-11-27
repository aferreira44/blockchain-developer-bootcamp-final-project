var ContractDeployer = artifacts.require("./ContractDeployer.sol");
var Utils = artifacts.require("./Utils.sol");

module.exports = function(deployer) {
  deployer.deploy(Utils);
  deployer.link(Utils, ContractDeployer);
  deployer.deploy(ContractDeployer);
};
