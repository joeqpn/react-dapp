pragma solidity ^0.5.0;
//truffle compile
//truffle migrate --reset


/// @title A simple storage contract
/// @author Joseph Oreste
/// @dev natspec

contract SimpleStorage {
/*
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
  */
string storeData;

constructor(string memory x) public {
  storeData = x;
}

event setValueEvent(
  address indexed _from,
  string value
);

/// @param x the new value to store
/// @return no return
function setValue(string memory x) public {
  storeData = x;
  emit setValueEvent(msg.sender, storeData);
}

function getValue() public view returns (string memory) {
  return storeData;
}

}
