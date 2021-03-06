//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MissingMinotaur is ERC721, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    string public baseURI = "";
    string public baseExtension = ".json";

    uint256 public constant MAX_SUPPLY = 499;
    uint256 public constant OWNER_MAX_CLAIM = 100;
  
    uint256 public mintPrice = 0.01 ether;
  
    constructor() ERC721 ("Missing Minotaur", "Missing Minotaur") {}

    modifier mintCondition() {
        require(supply.current() <= MAX_SUPPLY, "Max supply exceeded!");
        require(supply.current() < 499, "invalid claim");
      _;
    }

    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

    function mintNFT() public payable mintCondition {
        require(msg.value >= mintPrice, "Insufficient funds!");
        supply.increment();
        _safeMint(msg.sender, supply.current());

    }

    function ownerClaim(address _receiver) public onlyOwner {
        require((supply.current() < OWNER_MAX_CLAIM) && (supply.current() < MAX_SUPPLY), "Max supply exceeded!");
        supply.increment();
        _safeMint(_receiver, supply.current());
    }

    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
        uint256 currentTokenId = 1;
        uint256 ownedTokenIndex = 0;
        while (ownedTokenIndex < ownerTokenCount && currentTokenId <= MAX_SUPPLY) {
            address currentTokenOwner = ownerOf(currentTokenId);

            if (currentTokenOwner == _owner) {
                ownedTokenIds[ownedTokenIndex] = currentTokenId;
                ownedTokenIndex++;
            }
            currentTokenId++;
        }
        return ownedTokenIds;
    }
    
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId),"ERC721Metadata: URI query for nonexistent token");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), baseExtension)) : "";
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
