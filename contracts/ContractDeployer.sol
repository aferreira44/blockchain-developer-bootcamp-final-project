// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Utils.sol";
import "./ERC20/ERC20Controller.sol";
import "./ERC721/ERC721Controller.sol";

contract ContractDeployer is Ownable, ERC20Controller, ERC721Controller {
    //Declare an Event
    event ContractDeployed(
        address indexed _owner,
        uint256 indexed _contractType,
        address _contractAddress
    );

    mapping(address => Utils.ContractsDeployed[]) contractsDeployed;

    function deployContract(
        string memory contractType_,
        string memory name_,
        string memory symbol_
    ) public {
        // TODO: Get some fee to deploy it
        Utils.ContractType _contractType = Utils.getContractTypeKeyByValue(
            contractType_
        );

        address deployedContract = address(0x0);

        if (_contractType == Utils.ContractType.ERC721) {
            deployedContract = address(deployERC721(name_, symbol_));
        } else if (_contractType == Utils.ContractType.ERC20) {
            deployedContract = address(deployERC20(name_, symbol_));
        } else {
            revert();
        }

        contractsDeployed[msg.sender].push(
            Utils.ContractsDeployed(_contractType, deployedContract)
        );

        emit ContractDeployed(
            msg.sender,
            uint256(_contractType),
            deployedContract
        );
    }
}
