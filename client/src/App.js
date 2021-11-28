import React, { useState, useEffect } from "react";
import ContractDeployer from "./contracts/ContractDeployer.json";
import ERC20Contract from "./contracts/ERC20Contract.json";
import getWeb3 from "./getWeb3";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";

import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [deployedContractAddress, setDeployedContractAddress] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ContractDeployer.networks[networkId];
        const instance = new web3.eth.Contract(
          ContractDeployer.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    })();
  });

  useEffect(() => {
    if (contract) {
      contract.events
        .ContractDeployed()
        .on("data", (event) => {
          setDeployedContractAddress(event.returnValues._contractAddress);
        })
        .on("error", (error) => console.log(error));
    }
  });

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Contract Deployer</h1>
      <p>Here you can deploy your smart contract with just one click.</p>
      {/*  Your account: */}
      <Alert variant="primary">
        Your account: <b>{accounts}</b>
      </Alert>
      <hr />
      {/*  Tabs */}
      <Alert variant="primary">
        Contract Deployer: <b>{contract && contract._address}</b>
      </Alert>
      <Tabs
        defaultActiveKey="erc20"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {/*  ERC20 Tab */}
        <Tab eventKey="erc20" title="ERC20">
          <TokenParamsForm
            accounts={accounts}
            contract={contract}
            contractType="ERC20"
          />
          <hr></hr>
          <ContractInteraction contract={deployedContractAddress} />
        </Tab>
        {/*  ERC721 Tab */}
        <Tab eventKey="erc721" title="ERC721">
          <TokenParamsForm
            accounts={accounts}
            contract={contract}
            contractType="ERC721"
          />
        </Tab>
      </Tabs>
    </div>
  );
};

const TokenParamsForm = (props) => {
  const { contract, accounts, contractType } = props;
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const onChangeTokenSymbol = (e) => {
    setTokenSymbol(e.target.value);
  };

  const onChangeTokenName = (e) => {
    setTokenName(e.target.value);
  };

  const deployContract = async () => {
    const tx = await contract.methods
      .deployContract(contractType, tokenName, tokenSymbol)
      .send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>

            <Form.Control
              value={tokenName}
              onChange={onChangeTokenName}
              placeholder="Token Name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSymbol">
            <Form.Label>Symbol</Form.Label>
            <Form.Control
              value={tokenSymbol}
              onChange={onChangeTokenSymbol}
              placeholder="Token Symbol"
            />
          </Form.Group>
        </Row>
      </Form>
      <Button variant="success" onClick={deployContract}>
        {contractType === "ERC20" && "Deploy ERC20"}
        {contractType === "ERC721" && "Deploy ERC721"}
      </Button>
    </>
  );
};

const ContractInteraction = (props) => {
  const { contract } = props;
  return (
    <>
      <h2>Contract Interaction</h2>
      <Alert variant="primary">
        {contract ? (
          <b>Deployed Contract: {contract}</b>
        ) : (
          <b>No contract deployed yet</b>
        )}
      </Alert>
    </>
  );
};

export default App;
