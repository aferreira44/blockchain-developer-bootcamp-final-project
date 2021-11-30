import React, { useState, useEffect } from "react";
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
import Accordion from "react-bootstrap/Accordion";

import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [deployedContractAddress, setDeployedContractAddress] = useState(
    "0x035D0CE14bD3E988f75B82853669AB8652C9110a"
  );

  useEffect(() => {
    (async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    })();
  });

  window.ethereum.on("accountsChanged", (accounts) => {
    setAccounts(accounts);
  });

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="App">
      <h1>Contract Deployer</h1>
      <p>Here you can deploy and interact with your smart contract with just one click.</p>
      {/*  Your account: */}
      <Alert variant="primary">
        Your account: <b>{accounts}</b>
      </Alert>
      <hr />
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Deploy a new contract</Accordion.Header>
          <Accordion.Body>
            {/*  Tabs */}
            <Tabs
              defaultActiveKey="erc20"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {/*  ERC20 Tab */}
              <Tab eventKey="erc20" title="ERC20">
                <TokenParamsForm
                  deployedContractAddress={setDeployedContractAddress}
                  web3={web3}
                  accounts={accounts}
                  contractType="ERC20"
                />
              </Tab>
              {/*  ERC721 Tab */}
              <Tab eventKey="erc721" title="ERC721">
                <TokenParamsForm
                  web3={web3}
                  accounts={accounts}
                  contractType="ERC721"
                />
              </Tab>
            </Tabs>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Contract Interaction</Accordion.Header>
          <Accordion.Body>
            <ERC20Interaction
              accounts={accounts}
              web3={web3}
              address={deployedContractAddress}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

const TokenParamsForm = (props) => {
  const { web3, accounts, contractType } = props;
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const onChangeTokenSymbol = (e) => {
    setTokenSymbol(e.target.value);
  };

  const onChangeTokenName = (e) => {
    setTokenName(e.target.value);
  };

  const deployContract = async () => {
    switch (contractType) {
      case "ERC20":
        const erc20Contract = new web3.eth.Contract(ERC20Contract.abi);
        erc20Contract
          .deploy({
            data: ERC20Contract.bytecode,
            arguments: [tokenName, tokenSymbol],
          })
          .send({ from: accounts[0] })
          .on("confirmation", () => {})
          .then((newContractInstance) => {
            props.deployedContractAddress(newContractInstance.options.address);
          });
        break;

      case "ERC721":
        break;

      default:
        break;
    }

    // TODO: Add loading while waiting for transaction to be mined
    // TODO: Show notification when transaction is mined
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>

            <Form.Control
              value={tokenName}
              onChange={onChangeTokenName}
              placeholder="Token Name"
            />
          </Form.Group>

          <Form.Group as={Col}>
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
  const { web3, accounts, address } = props;
  const [contractAddress, setContractAddress] = useState("");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [symbol, setSymbol] = useState("");
  const [transferAddressTo, setTransferAddressTo] = useState(
    "0x87f98Ba5bffB37Cc8cEA5b1A225D90308cDF5f59"
  );
  const [transferAmount, setTransferAmount] = useState(100);
  const [balanceAccount, setBalanceAccount] = useState(
    "0x6b65b09797B3Ab33Ec6E2Af0407E0a0836027f9f"
  );
  const [balanceValue, setBalanceValue] = useState("");
  const [mintAccountTo, setMintAccountTo] = useState(
    "0x87f98Ba5bffB37Cc8cEA5b1A225D90308cDF5f59"
  );
  const [mintAmount, setMintAmount] = useState(100);

  const instance = new web3.eth.Contract(ERC20Contract.abi, contractAddress);

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

  const onChangeMintAccountTo = (e) => {
    setMintAccountTo(e.target.value);
  };

  const onChangeMintAmount = (e) => {
    setMintAmount(e.target.value);
  };

  const onChangeTransferAmount = (e) => {
    setTransferAmount(e.target.value);
  };

  const onChangeBalanceAddress = (e) => {
    setBalanceAccount(e.target.value);
  };

  const loadContractData = () => {
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

  const balanceOf = async () => {
    instance.methods
      .balanceOf(balanceAccount)
      .call()
      .then((value) => {
        console.log("value :>> ", web3.utils.fromWei(value, "ether"));
        setBalanceValue(web3.utils.fromWei(value, "ether"));
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  const transfer = async () => {
    instance.methods
      .transfer(transferAddressTo, web3.utils.toWei(transferAmount))
      .send({ from: accounts[0] })
      .on("confirmation", () => {})
      .then((response) => {
        console.log("response :>> ", response);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  const mint = async () => {
    instance.methods
      .mint(mintAccountTo, web3.utils.toWei(mintAmount))
      .send({ from: accounts[0] })
      .on("confirmation", () => {})
      .then((response) => {
        console.log("response :>> ", response);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Contract Address</Form.Label>

            <Form.Control
              value={contractAddress}
              onChange={onChangeContractAddress}
              placeholder="0x00000000000000000000"
            />
          </Form.Group>
        </Row>
        <Row>
          <Button variant="primary" onClick={loadContractData}>
            Load Contract
          </Button>
        </Row>
        <Row className="m-3">
          <Form.Group as={Col}>
            <Form.Label>Token Name: </Form.Label>

            {name}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Contract Owner: </Form.Label>

            {owner}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Total Supply: </Form.Label>
            {web3.utils.fromWei(totalSupply, "ether")} {symbol}
          </Form.Group>
        </Row>
      </Form>
      <hr />
      {/*  Tabs */}
      <Tabs
        defaultActiveKey="getBalance"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="getBalance" title="Get Balance">
          {/* 'balanceOf(address)': [Function: bound _createTxObject], */}
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Account:</Form.Label>

                <Form.Control
                  value={balanceAccount}
                  onChange={onChangeBalanceAddress}
                  placeholder="0x00000000000000000000"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Balance:</Form.Label>
                {balanceValue} {symbol}
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" onClick={balanceOf}>
                Get Balance
              </Button>
            </Row>
          </Form>
        </Tab>
        <Tab eventKey="transfer" title="Transfer">
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Address To:</Form.Label>

                <Form.Control
                  value={transferAddressTo}
                  onChange={onChangeTransferAddressTo}
                  placeholder="0x00000000000000000000"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Amount:</Form.Label>
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
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" onClick={transfer}>
                Transfer {transferAmount} {symbol}
              </Button>
            </Row>
          </Form>
        </Tab>
        <Tab eventKey="mint" title="Mint">
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Address To:</Form.Label>

                <Form.Control
                  value={mintAccountTo}
                  onChange={onChangeMintAccountTo}
                  placeholder="0x00000000000000000000"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Amount:</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={mintAmount}
                    onChange={onChangeMintAmount}
                    placeholder={"0.01 " + symbol}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">{symbol}</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" onClick={mint}>
                Mint {mintAmount} {symbol}
              </Button>
            </Row>
          </Form>
        </Tab>
      </Tabs>{" "}
    </>
  );
};

export default App;
