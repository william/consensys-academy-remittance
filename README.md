## Overview

The contract Remittance.sol allows Alice to send funds to Bob through Carol's Exchange shop. Alice sends Ether and Bob receives USD.

Alice =(ETH)=> Carol =(USD)=> Bob

Only the contract and truffle test suite exist. The web interface has not been implemented.


### Requirements

* Implemented
    * There are 3 people: Alice, Bob and Carol
    * Alice wants to send funds to Bob, but she only has ether & Bob wants to be paid in local currency.
    * Carol runs an exchange shop that converts ether to local currency.
    * Passwords should not be sent to the blockchain in cleartext

* Flow
    * Alice =(ETH, password1, password2)=> Remittance Contract
    * Alice =(password1)=> Carol
    * Alice =(password2)=> Bob
    * Bob =(password2)=> Carol
    * Carol =(password1,password2)=> Remittance Contract
            <========(ETH)==========


### Stretch goals

* Not Implemented
    * Add a commission
    * Add a deadline, after which Alice can claim back the unchallenged Ether
    * Add a limit to how far in the future the deadline can be
    * Add a kill switch to the whole contract
    * Plug a security hole (which one?) by changing one password to the recipient's address
    * Make the contract a utility that can be used by David, Emma and anybody with an address
    * Make you, the owner of the contract, take a cut of the Ethers smaller than what it would cost Alice to deploy the same contract herself
