//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract MissingMinotaurMaze is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;

    struct Puzzle {
        uint256 seed;
        uint256[] clicks;
        uint256 puzzleLength;
    }

    struct Game {
        Puzzle puzzle;
        address nftContractAddress;
        uint256 nftId;
    }

    Counters.Counter private supply;

    uint256 public mintPrice = 1 ether;

    uint256 public randomNumber = 50;
    address[] contractAddress;

    constructor() ERC721('Missing Minotaur Maze', 'MMM') {}

    function _collatzNext(uint256 x) private pure returns (uint256 result) {
        if (x % 2 == 0) {
            return x / 2;
        }
        return 3 * x + 1;
    }

    function _min(uint256 a, uint256 b) private pure returns (uint256) {
        if (a > b) return b;
        return a;
    }

    function _max(uint256 a, uint256 b) private pure returns (uint256) {
        if (a > b) return a;
        return b;
    }

    function _subtractNoNegative(uint256 a, uint256 b)
        private
        pure
        returns (uint256)
    {
        if (a > b) return a - b;
        return 0;
    }


    function _generatePuzzle(uint256 seed)
        private
        pure
        returns (Puzzle memory)
    {
        uint256[] memory clicks = new uint256[](10);

        uint256 collatzCurrent = seed;
        uint256 puzzleLength;

        for (
            puzzleLength = 0;
            puzzleLength < clicks.length && collatzCurrent > 1;
            puzzleLength++
        ) {
            clicks[puzzleLength] = collatzCurrent % 36;
            collatzCurrent = _collatzNext(collatzCurrent);
        }

        return Puzzle(seed, clicks, puzzleLength);
    }

    function puzzle(uint256 tokenId) public view returns (Puzzle memory) {
        require(_exists(tokenId), 'MMM: Puzzle does not exist.');
        return _generatePuzzle(tokenId + randomNumber);
    }

    function mint() public payable nonReentrant {
        require(
            msg.value >= mintPrice,
            'MMM: Amount of MATIC sent is incorrect.'
        );
        uint256 sum = 0;
        for (uint256 i = 0; i < contractAddress.length; i++) {
            sum += ERC721(contractAddress[i]).balanceOf(msg.sender);
            if (sum > 0) break;
        }
        require(sum > 0, "Should have NFT associated with Missing Minotaur Maze");
        supply.increment();
        _safeMint(msg.sender, supply.current());
    }

    function burnAndClaimReward(uint256 tokenId, uint256[] memory clicks)
        public
        virtual
    {
        require(_exists(tokenId), 'MMM: Puzzle does not exist.');
        require(
            ownerOf(tokenId) == msg.sender,
            'MMM: burning from incorrect owner'
        );
        // TODO: require that not more than 20 minutes has passed
        require(clicks.length != 0, 'MMM: Solution required.');
        // TODO: require that clicks do solve the puzzle
        _burn(tokenId);
        payable(msg.sender).transfer(1 ether);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
