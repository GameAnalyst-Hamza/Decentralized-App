// SPDX-License-Identifier: MIT
// 10 Pearls Modifies Code Change mintedURI from uint8 to bool

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Collection is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _totalMinted;

    uint256 public PRICE_PER_TOKEN = 0.0001 ether;
    uint public LIMIT_PER_ADDRESS = 3;
    uint256 public MAX_SUPPLY = 1000;

    mapping(address => uint8) private mintedAddress;
    mapping(string => bool) private mintedURI;

    constructor() ERC721("NFT_DAPP", "NFT") {}

    function setPrice(uint256 price) external onlyOwner {
        PRICE_PER_TOKEN = price;
    }

    function setLimit(uint256 limit) external onlyOwner {
        LIMIT_PER_ADDRESS = limit;
    }

    function setMaxSupply(uint256 supply) external onlyOwner {
        MAX_SUPPLY = supply;
    }

    function mintNFT(
        string memory tokenURI
    ) external payable returns (uint256) {
        require(
            PRICE_PER_TOKEN <= msg.value,
            "Required amount for minting must be paid"
        );
        require(
            mintedAddress[msg.sender] < LIMIT_PER_ADDRESS,
            "You have exceeded the minting limit for NFT"
        );
        require(
            _totalMinted.current() + 1 <= MAX_SUPPLY,
            "You have exceeded the supply"
        );
        require(mintedURI[tokenURI], "This NFT has already been minted");
        mintedURI[tokenURI] = true;
        mintedAddress[msg.sender] += 1;
        _tokenIds.increment();
        _totalMinted.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function withDrawMoney() external onlyOwner {
        address payable to = payable(msg.sender);
        to.transfer(address(this).balance);
    }
}
