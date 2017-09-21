var Remitter = artifacts.require("./Remitter.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Remitter, accounts[0], accounts[1], accounts[2]);
};
