# Blockchain Developer Bootcamp Final Project

Bootcamp URL: https://courses.consensys.net/courses/blockchain-developer-bootcamp-registration-2021

## What does the project do?

The project lets users to deploy ERC20 on the blockchain without any previous knowledge of programming.

The deployers of the smart contracts can interact with the smart contracts on the blockchain by using the smart contracts' functions through the web interface.

Here are the enabled functions of the smart contracts in this project:

**ERC20**

- BalanceOf
- Mint
- Transfer

## Deployed contract

If you want to use the smart contract already deployed and loaded when open the frontend, read the following section.

- The contract has been deployed to the [Binance testnet](https://testnet.binance.org): 0x035D0CE14bD3E988f75B82853669AB8652C9110a.
- The owner account of deployed contract is: 0x6b65b09797B3Ab33Ec6E2Af0407E0a0836027f9f.
- To have access to the owner of the contract, you can use the following mnemonic:

:warning: **Don't use this mnemonic for other projects or in a production network**

`learn fluid latin offer laugh bless giant rocket retire horror business road`

## How to test

Just run `truffle test` in the terminal.

## Next Steps

- Add ERC721 deploy and contract interaction functionality

## ERC20 Workflow

1. Deploy Smart Contract
2. Check the smart contract data
3. Check the owner's balance
4. Transfer an ERC20 token amount to another account

## Accessing the frontend

You can access the frontend [here](https://blockchain-developer-bootcamp-final-project-sigma.vercel.app/).

## Screencast

To view a screencast [visit](https://drive.google.com/file/d/1kSWZ2Ka_Qe7pSDcqXzg65j0RPiNgYP8k/view?usp=sharing)

:warning: **Make sure you are connecting a BSC testnet wallet**: Be very careful here!

## Getting started

To install the local dependencies run `yarn install` in both the `root` and `client` directory of the project. To run the frontend, call `yarn start` in the `client` directory.

To run the contract tests, run `ganache-cli` (host: `127.0.0.1` port: `8545`) and `truffle test` in the root directory.

## Directory Structure

The contract code and the associated infrastructure can be found in the `root` of the repo. The frontend source code can be in the `client` directory.

Inspired by [OpenZepellin Contracts Wizard](https://wizard.openzeppelin.com/) and [Remix Ethereum IDE](https://remix.ethereum.org/)
