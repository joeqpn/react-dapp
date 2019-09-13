This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites
Install Truffle 
### `npm install -g truffle`

Download the Github repo to a local project folder
[Github React-Dapp](https://github.com/joeqpn/react-dapp)

Install Google Chrome MetaMask Extension (Desktop)
[MetaMask Extension](https://mobile.metamask.io)

Install MetaMask Mobile
[MetaMask Mobile](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
NOTE: There should be instructions on how to sync your desktop MetaMask with your Mobile MetaMask...You may want to create several Desktop test accounts prior to syncing with your mobile wallet...
NOTE: Syncing will not bring over imported accounts you will have to add them manually to the mobile wallet. 

Configure MetaMask For localhost connection
In the MetaMask Plugin
Goto Settings > Networks > Add Network
New RPC URL
http://127.0.0.1:9545/
Select Save

Deploy the smart contract to the local Development server
Open a shell
### `cd <location of downloaded react-dapp repo>`
### `truffle develop`
### `migrate --reset --network develop`
(resolve any errors before continuing)
***LEAVE THIS SHELL OPEN***

Import truffle Develop address into MetaMask
From the previous step of ### `truffle develop` 10 addresses were created
select account 0 private key
In Metamask select Import Account
Select Type Private Key
Paste Private key
Select Import
Rename the account to something you can identify with local truffle blockchain 'Develop 0'
NOTE: if you don't see 10 ETH in the newly imported account reset the account
In MetaMask
Goto Settings > Advanced > Reset Account

Start the node webserver
Open a Shell
### `cd <location of dowloaded react-dapp repo>`
### `npm run start`
NOTE: Leave this shell open
To Quite node webserver
### `Ctrl-c`
This should launch the app in your browser. 
Ensure the app launches in Google where your MetaMask addon is installed

Now you can enter a new string and select Submit. It should automatically update with the new stored value. 

To Deploy to Rinkeby Testnet
First we need to generate an ETH address to use for testing
In MetaMask got Create Account and create a new ETH test account

Now you can get ETH to use on the Rinkeby Testnet by going to a faucet
[Rinkeby Faucet](https://faucet.rinkeby.io/)
NOTE: This can take some time if the network is busy. It should give you a response on the page when your ETH has been funded.
Verify if the ETH has arrived in your address through Metamask
You can also verifiy if the ETH has arrived by pasting your public address to
[Rinkeby Etherscan](https://rinkeby.etherscan.io/)

If Rinkeby Etherscan shows that the ETH has been sent to the address but you don't see it in you Metamask wallet.  Sometimes you may have to change to another network and change back to refresh the account.
You can also reset the account as well if you don't see the ETH show up
Goto Settings > Advanced > Reset Account

Now that Metamask is pointing to Rinkeby network and you have selected an account that has Rinkeby ETH you can now deploy the smart contracts to Rinkeby...


Lets stop the local truffle develop blockchain
In the shell that truffle develop is running in
### `.exit`

Now we can deploy to Rinkeby
### `truffle migrate --reset --network rinkeby`

Now you should be able to refresh you app and it should connect to the Rinkeby Testnet. A good indication that you are now pointing to Rinkeby is that the saved value should revert to the default 'cookies'. 

Extra Credit: 
See if you can bring up the app in your mobile MetaMask browser. You will need to make sure you are connected to the Rinkeby Network and that you have selected an address that has Rinkeby ETH. 



