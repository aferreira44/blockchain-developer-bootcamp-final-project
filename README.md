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

The contract has been deployed to the Binance testnet.

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

<!-- To view a screencast [visit](https://drive.google.com/file/d/1bNsSN-SJnogjmFn4Rdxc0Ffk-mtSWdpP/view?usp=sharing) -->

:warning: **Make sure you are connecting a BSC testnet wallet**: Be very careful here!

## Getting started

To install the local dependencies run `yarn install` in both the `root` and `client` directory of the project. To run the frontend, call `yarn start` in the `client` directory.

To run the contract tests, run `ganache-cli` (host: `127.0.0.1` port: `8545`) and `truffle test` in the root directory.

## Directory Structure

The contract code and the associated infrastructure can be found in the `root` of the repo. The frontend source code can be in the `client` directory.

Inspired by [OpenZepellin Contracts Wizard](https://wizard.openzeppelin.com/) and [Remix Ethereum IDE](https://remix.ethereum.org/)
