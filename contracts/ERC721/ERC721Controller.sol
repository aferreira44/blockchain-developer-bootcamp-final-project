// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Utils.sol";

contract ERC721Controller is Ownable {
    function deployERC721(string memory name_, string memory symbol_)
        public
        returns (address)
    {
        // TODO: Get some fee to deploy it

        return address(new ERC721Contract(name_, symbol_, msg.sender));
    }

    // function mint(address _to, uint256 _amount) public {}

    // function transfer(address _to, uint256 _amount) public {}
}
