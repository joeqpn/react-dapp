import Web3 from "web3";


const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers pc based...
      //console.log("Mobile?: " + isMobile);
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          
          console.log("Modern Web3 detected.");
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
       /* // Use websockets provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
        */
       const provider = new Web3.providers.WebsocketProvider(
          //"http://127.0.0.1:9545"
          "ws://127.0.0.1:8545",{
            headers: {
              Origin: "forWebSocket"
            }
          }
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        //const provider = new Web3.providers.HttpProvider(
        const provider = new Web3.providers.WebsocketProvider(
          "ws://127.0.0.1:8545"
          //"http://127.0.0.1:9545"
          ,{
            headers: {
              Origin: "forWebSocket"
            }
          }
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3

