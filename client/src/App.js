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
import InputGroup from "react-bootstrap/InputGroup";

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
          <ERC20Interaction web3={web3} address={deployedContractAddress} />
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

    // TODO: Add loading while waiting for transaction to be mined
    // TODO: Show notification when transaction is mined

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

const ERC20Interaction = (props) => {
  const { web3, address } = props;
  const [contractAddress, setContractAddress] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [symbol, setSymbol] = useState("");
  const [transferAddressTo, setTransferAddressTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  useEffect(() => {
    setContractAddress(address);
  }, [address]);

  useEffect(() => {
    loadContractData();
  });

  const onChangeContractAddress = (e) => {
    setContractAddress(e.target.value);
  };

  const onChangeTransferAddressTo = (e) => {
    setTransferAddressTo(e.target.value);
  };

  const onChangeTransferAmount = (e) => {
    setTransferAmount(e.target.value);
  };

  const loadContractData = () => {
    const instance = new web3.eth.Contract(ERC20Contract.abi, contractAddress);
    if (instance._address) {
      instance.methods
        .name()
        .call()
        .then((name) => {
          setName(name);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });

      instance.methods
        .owner()
        .call()
        .then((owner) => {
          setOwner(owner);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });

      instance.methods
        .totalSupply()
        .call()
        .then((totalSupply) => {
          setTotalSupply(totalSupply);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });

      instance.methods
        .symbol()
        .call()
        .then((symbol) => {
          setSymbol(symbol);
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    }
  };

  return (
    <>
      <h2>Contract Interaction</h2>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridContractAddress">
            <Form.Label>Contract Address</Form.Label>

            <Form.Control
              value={contractAddress}
              onChange={onChangeContractAddress}
              placeholder="0x00000000000000000000"
            />
            <Button variant="primary" onClick={loadContractData}>
              Load
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <p>Token Name: {name}</p>
      <p>Contract Owner: {owner}</p>
      <p>
        Total Supply: {totalSupply} {symbol}
      </p>

      <hr />

      <h3>Transfer</h3>

      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddressTo">
            <Form.Label>Address To:</Form.Label>

            <Form.Control
              value={transferAddressTo}
              onChange={onChangeTransferAddressTo}
              placeholder="0x00000000000000000000"
            />
            <InputGroup className="mb-3">
              <Form.Control
                value={transferAmount}
                onChange={onChangeTransferAmount}
                placeholder={"0.01 " + symbol}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">{symbol}</InputGroup.Text>
            </InputGroup>
            <Button variant="primary" onClick={loadContractData}>
              Transfer {transferAmount} {symbol}
            </Button>
          </Form.Group>
        </Row>
      </Form>

      {/* 'balanceOf(address)': [Function: bound _createTxObject],
    
    'transfer(address,uint256)': [Function: bound _createTxObject], */}
      {/* Event Transfer */}
    </>
  );
};

export default App;
