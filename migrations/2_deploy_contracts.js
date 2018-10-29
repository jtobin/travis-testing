var Ships = artifacts.require("./Ships.sol");

module.exports = async function(deployer) {

  var ships;
  deployer.then(function() {
  }).then(function() {
    return deployer.deploy(Ships);
  }).then(function() {
    return Ships.deployed();
  })
};
