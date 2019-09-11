require('dotenv').config();
const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');



/*
To run this example:
1. cd to the truffle-react folder: truffle develop starts a new blockchain, compile and migrate the app
/Users/joe/Documents/truffle/projects/react-dapp
2. in metamask you need to choose the 9545 port which is the port truffle develop runs on
now delete existing imported accounts as those accounts no longer exist
reimport account 0
3. in another shell cd to the truffle-react client folder: npm run start (this starts apache and listens on port 3000)
/Users/joe/Documents/truffle/projects/react-dapp/client
4. open browser to localhost:3000 
5. each time you save the app.js with a new value you need to approve the transaction in metamask from the account imported.
then you should see your value set and viewed in the browser.

to use another blockchain like testrpc change getWeb3.js

*/
/*
THIS IS THE DEFAULT COMMENT OUT THE OTHER module.export BELOW!!!!
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};
*/


module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*", // Match any network id
      websockets: true
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby_local: {
      host: "127.0.0.1",
      port: 8545,
      //from: 0x90820b520fb20c87de927607419d61ea422ed11d, // from geth address test network wallet 1
      network_id: "4", // Match any network id
      websockets: true,
      gas: 4612388
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      websockets: true,
      gas: 4612388,
      network_id: 4
    }
  }
};
