import Web3 from "web3";


  const getWeb3WS = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.        console.log("Enabling Infura Websocket");
      // Modern dapp browsers pc based...
      //console.log("Mobile?: " + isMobile);
        
        try {
            const web3WS = new Web3( new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/db7a4bd577ba4c7ab8593520c14d59c4"));
            console.log("Websocket Enabled.");
            // Acccounts now exposed
            resolve(web3WS);
        } catch (error) {
            reject(console.error(error));
        }
      });
   

export default getWeb3WS

