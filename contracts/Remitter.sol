pragma solidity ^0.4.4;

contract Remitter {
    address alice;
    address bob;
    address carol;
    bytes32 carolHashedPassword;
    bytes32 bobHashedPassword;

    event LogInt(uint logInt);
    event LogString(string logString);
    event LogBytes32(bytes32 logBytes32);

    function Remitter(address _alice, address _bob, address _carol) {
        //Initialise the contract with the addresses of Alice, Bob, and Carol
        alice = _alice;
        bob = _bob;
        carol = _carol;
    }

    function deposit(string _carolPassword, string _bobPassword) payable {
        //Allows Alice to set the passwords required for withdrawal
        carolHashedPassword = sha256(_carolPassword, carol); //salt with account address
        LogBytes32(carolHashedPassword);
        bobHashedPassword = sha256(_bobPassword, bob);
        LogBytes32(sha256(bobHashedPassword));
    }

    function withdraw(string _carolPassword, string _bobPassword) {
        //Allows Carol (and only Carol) to withdraw ETH after supplying correct passwords
        if( carolHashedPassword == sha256(_carolPassword, carol) &&
            bobHashedPassword == sha256(_bobPassword, bob) )
        {
            msg.sender.transfer(this.balance);
            LogInt(this.balance);
        } else {
            LogString('Password rejected');
        }
    }


}
