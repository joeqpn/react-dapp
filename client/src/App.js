import React, { Component } from "react";
//import SimpleStorageContract from "../../build/contracts/SimpleStorage.json"; investigate build directory
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import getWeb3WS from "./utils/getWeb3WS";
//import SockJS from "sockjs-client";


import "./App.css";

class Clock extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date()
    };
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillMount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>The local time is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

class App extends Component {
  state = {
    storageValue: "",
    web3: null,
    accounts: null,
    contract: null,
    contractWS: null,
    newValue: "",
    loading: false
  };
  //state = { storageValue: "", web3: null, accounts: null, contract: null, newValue: "" };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
        // var isMobile = false;

        // if( navigator.userAgent.match(/Android/i)
        // || navigator.userAgent.match(/webOS/i)
        // || navigator.userAgent.match(/iPhone/i)
        // || navigator.userAgent.match(/iPad/i)
        // || navigator.userAgent.match(/iPod/i)
        // || navigator.userAgent.match(/BlackBerry/i)
        // || navigator.userAgent.match(/Windows Phone/i)
        // ){
          
        //   isMobile = true;
        //  }
        // else {
          
        //   isMobile = false;
        //  };

      //   console.log("App is mobile: " + isMobile);

      const web3 = await getWeb3();
      const web3ws = await getWeb3WS();
      // const web3WS = await getWeb3WS();

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.Set = this.Set.bind(this);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts(); //the active account in metamask
      
      //this.setState({ isMobile: getMobile });
      // console.log("App Mobile?: " + isMobile);
      console.log("accounts: " + accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("NetworkID: " + networkId);
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      console.log("deployedNetwork: " + deployedNetwork);
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const instanceWS = new web3ws.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      console.log("SimpleStorageContract.abi: " + SimpleStorageContract.abi);
      //console.log("deployedNetwork and address: " + deployedNetwork && deployedNetwork.address);
      console.log("Instance: " + instance);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance, contractWS: instanceWS }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getValue().call();
    console.log(response);

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  handleChange(event) {
    //console.log(this.state.newValue);
    this.setState({ newValue: event.target.value });
  }

  async handleSubmit(event) {
    /* TESTING
    alert('A name was submitted: ' + this.state.newValue);
    event.preventDefault();
    this.setState({newValue: ""});
    */

    event.preventDefault();
    //const { accounts, contract } = this.state;
    const { accounts, contract, contractWS } = this.state;
    console.log("save account[0]:" + { from: accounts[0] });
    this.setState({ loading: true });
    console.log("onsave loading 1: " + this.state.loading);
    /*
    const receipt = await contract.methods
      .set(this.state.newValue)
      .send({ from: accounts[0] }, (error, transactionHash) => {
        console.log('Hash Returned' + transactionHash)
      });
*/

    contractWS.events
      .setValueEvent(
        //https://github.com/trufflesuite/truffle/issues/1254
        {},
        {
          fromBlock: 0
        },
        (error, response) => {
          console.log(event);
        }
      )
      .on("data", response => {
        console.log("The event value: " + response.returnValues.value);
        this.setState({ storageValue: response.returnValues.value, newValue: "", loading: false });
      })
      .on("error", console.error);

    /*
  //https://github.com/trufflesuite/truffle/issues/1254
    const myevent = contract.events.setValueEvent (
      {},
      {
        fromBlock: 0,
        toBlock: 'latest'
      });
*/
    contract.methods.setValue(this.state.newValue).send({ from: accounts[0] });
    /*
    contract.methods
      .setValue(this.state.newValue)
      .send({ from: accounts[0] })
      .on("receipt", receipt => {
        console.log(receipt.storedValue);
    });
*/
/* ORIGINAL CODE
    console.log("onsave loading 2: " + this.state.loading);

    const response = await contract.methods.getValue().call();
    console.log("save response:" + response);
    this.setState({ storageValue: response, newValue: "", loading: false });
*/
    //this.setState({storageValue: response});
    // reset the text box variable
    //this.setState({newValue: ""});
  }
  /*
  storedValueEvent() {
    //https://github.com/trufflesuite/truffle/issues/1254
    this.contract
      .storedValue(
        {},
        {
          fromBlock: 0
        },
        (error, event) => {
          console.log(event);
        }
      )
      .on("data", event => {
        this.setState({ loading: false });
      })
      .on("error", console.error);
  }
*/
  /*
    storedValueEvent() {
      this.contract.storedValue({}, {
      fromBlock: 0,
      toBlock: 'latest'
      }).watch((error, event) => { 
        this.setState({ loading: false });
      })
    }
    */

  render() {
    console.log("render loading: " + this.state.loading);
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    //
    return (
      /*
        <form onSubmit={this.handleSubmit}>
            <label>
            New Value: 
            <input type="text" value={this.state.newValue} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        */
      <div className="App">
        <h1>Simple Dapp!</h1>
        <div>The stored value is: <b>{this.state.storageValue}</b></div>
        <form onSubmit={this.handleSubmit}>
          <label>
            New Value:
            <input
              type="text"
              value={this.state.newValue}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Clock />
      </div>
    );
    //}
  }
}

export default App;
/*
class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      console.log(deployedNetwork);
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(82).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
*/
