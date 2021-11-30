// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title A ERC20 Contract
/// @author André Ferreira
/// @notice This contract is a simple wrapper for the ERC20 contract for studies purposes
contract ERC20Contract is ERC20, Ownable {
    constructor(string memory name_, string memory symbol_)
        ERC20(name_, symbol_)
    {
        _mint(msg.sender, 1000 * 10**18); // TODO: Allow to set initial supply
    }

    /// @notice Mints a tokens amount to the given address
    /// @param _to The address to mint the tokens to
    /// @param _amount The amount of tokens to mint
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}
