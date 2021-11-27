// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./ERC721/ERC721Contract.sol";
import "./ERC20/ERC20Contract.sol";

library Utils {
    struct ContractsDeployed {
        ContractType contratType;
        address contractAddress;
    }

    enum ContractType {
        ERC20,
        ERC721
    }

    function getContractTypeKeyByValue(string memory contractType_)
        internal
        pure
        returns (ContractType)
    {
        // Loop through possible options
        if (compareStrings(contractType_, "ERC20")) return ContractType.ERC20;
        if (compareStrings(contractType_, "ERC721")) return ContractType.ERC721;
        else revert();
    }

    function compareStrings(string memory a_, string memory b_)
        public
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked((a_))) ==
            keccak256(abi.encodePacked((b_)));
    }
}
