// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Contract is ERC721, Ownable {
    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}
}
