var Remitter = artifacts.require("./Remitter.sol");

contract('Remitter', function(accounts) {

  var remitter;

  var alice = accounts[0];
  var bob = accounts[1];
  var carol = accounts[2];
  var carolPassword = "foo";
  var bobPassword = "bar";
  var sendAmount = web3.toBigNumber(web3.toWei(1, 'ether'));

  beforeEach(function() {
    return Remitter.new()
    .then(function(instance) {
      remitter = instance;
    });
  });


  it("should allow alice to deposit funds", function() {
    var tx = {from: alice, value: sendAmount};
    return remitter.deposit(carolPassword, bobPassword, tx).then(function(result) {
      var remitterBalance = web3.eth.getBalance(remitter.address);
      assert.equal(remitterBalance.toString(), sendAmount.toString());
    });
  });

  it("should allow carol to withdraw funds", function() {
    var carolOriginalBalance = web3.eth.getBalance(carol);
//    console.log('carol starts with: ', carolOriginalBalance.toString());
//    console.log('send amount is: ', sendAmount.toString());
    var tx = {from: alice, value: sendAmount};
    return remitter.deposit(carolPassword, bobPassword, tx).then(function(result) {
      var gasPrice = web3.eth.gasPrice;
      var tx = {from: carol, gasPrice: gasPrice};
      return remitter.withdraw(carolPassword, bobPassword, tx).then(function(result) {
        var gasUsed = web3.toBigNumber(result.receipt.gasUsed);
        var carolNewBalance = web3.eth.getBalance(carol);
//    console.log('carol ends with: ', carolNewBalance.toString());
        assert.equal(carolNewBalance.minus(carolOriginalBalance).plus(gasUsed.times(gasPrice)).toString(), sendAmount.toString());
      });
    });
  });

  it("should fail if a password does not match", function() {
    var carolOriginalBalance = web3.eth.getBalance(carol);
    var tx = {from: alice, value: sendAmount};
    return remitter.deposit(carolPassword, bobPassword, tx).then(function(result) {
      var gasPrice = web3.eth.gasPrice;
      var tx = {from: carol, gasPrice: gasPrice};
      return remitter.withdraw('wrong password', bobPassword, tx).then(function(result) {
        var gasUsed = web3.toBigNumber(result.receipt.gasUsed);
        var carolNewBalance = web3.eth.getBalance(carol);
        assert.equal(carolNewBalance.minus(carolOriginalBalance).plus(gasUsed.times(gasPrice)).toString(), '0');
      });
    });
  });

});
