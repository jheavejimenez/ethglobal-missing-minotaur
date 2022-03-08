//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract MissingMinotaur is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  
  constructor() ERC721 ("Missing Minotaur", "Missing Minotaur") {
    console.log("This is my NFT contract. Woah!");
  }

  function mintNFT() public {
    uint256 newItemId = _tokenIds.current();

    _safeMint(msg.sender, newItemId);

    // Set the NFTs data.
    _setTokenURI(newItemId, "blah");
    _tokenIds.increment();

  }
}
