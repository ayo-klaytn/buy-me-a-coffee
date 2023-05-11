import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import abi from "../utils/BuyMeACoffee.json"

import { ethers } from "ethers";
import { useEffect, useState } from 'react';

import Onboard from "@web3-onboard/core";

const ETH_MAINNET_RPC_URL = `https://ethereum-mainnet-rpc.allthatnode.com/1d322388ZEPI2cs0OHloJ6seI4Wfy36N`;
const KLAYTN_MAINNET_URL = `https://klaytn-mainnet-rpc.allthatnode.com:8551/1d322388ZEPI2cs0OHloJ6seI4Wfy36N`
const KLAYTN_BAOBAB_URL = `https://klaytn-baobab-rpc.allthatnode.com:8551/1d322388ZEPI2cs0OHloJ6seI4Wfy36N`

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x1", // chain ID must be in hexadecimal
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: ETH_MAINNET_RPC_URL
    },
    {
      id: "0x2019", // chain ID must be in hexadecimal
      token: "KLAY",
      namespace: "evm",
      label: "Klaytn Mainnet",
      rpcUrl: KLAYTN_MAINNET_URL
    },
    {
      id: "0x3e9", // chain ID must be in hexadecimel
      token: "KLAY",
      namespace: "evm",
      label: "Klaytn Testnet",
      rpcUrl: KLAYTN_BAOBAB_URL
    },
   // you can add as much supported chains as possible
  ],
  appMetadata: {
    name: "Klaytn-web3-onboard-App", // change to your dApp name
    icon: "data:image/jpeg;base64,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", // paste your icon 
    logo: "data:image/jpeg;base64,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", // paste your logo
    description: "Web3Onboard-Klaytn",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});

export default function Home() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [coffee, setGetCoffee] = useState([]);

  const contractAddress = "0xaB720954D64F14ADb21311D81F65d5EB006446B6";
  const contractABI = abi.abi;

  useEffect(() => {
      let buyMeACoffee;
      // isWalletConnected();
      getCoffee();

      const onNewCoffee = (from, timestamp, name, message) => {
        console.log("Memo received: ", from, timestamp, name, message);
        setGetCoffee((prevState) => [
          ...prevState,
          {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message,
            name
          }
        ]);
      };

      if (provider) {
        const ethersProvider = new ethers.BrowserProvider(provider);
        buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          ethersProvider
        );
  
        buyMeACoffee.on("NewCoffee", onNewCoffee);
      }

      return () => {
        if (buyMeACoffee) {
          buyMeACoffee.off("NewCoffee", onNewCoffee);
        }
      }

  }, [provider])

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  // const isWalletConnected = async () => {
  //   try {
      
  //     const currentState = onboard.state.get();
  //     console.log(currentState);

  //     const accounts = currentState.wallets;

  //     console.log("accounts: ", accounts);

  //     if (accounts.length > 0) {
  //       const account = accounts[0];
  //       console.log("wallet is connected! " + account);
  //     } else {
  //       console.log("make sure web3-onboard is connected");
  //     }
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // }

  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, chains, provider } = wallets[0];
      
      setProvider(provider);
      setAccount(accounts[0].address);
      setChainId(chains[0].id);
     
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (primaryWallet) await onboard.disconnectWallet({ label: primaryWallet.label });
    refreshState();
  };

  // refresh state
  const refreshState = () => {
    setAccount("");
    setChainId("");
    setProvider();
    // make sure to add every other state declared here.
  };

  const buyCoffee = async (e) => {
    e.preventDefault();
    try {

      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }

       const ethersProvider = new ethers.BrowserProvider(provider);
       const signer = await ethersProvider.getSigner();
       const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer)

        console.log("buying coffee..")
        const coffeeTxn = await buyMeACoffee.buyCoffee(name, message, {value: ethers.parseEther("1.0")});

        const coffeTx =  await coffeeTxn.wait();

        console.log("mined ", coffeTx.hash);

        console.log("coffee sent!");

        // Clear the form fields.
        setName("");
        setMessage("");
        await getCoffee();
    } catch (error) {
      console.log(error);
    }
  };

  const getCoffee = async () => {
    try {

      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }

       const ethersProvider = new ethers.BrowserProvider(provider);
       const signer = await ethersProvider.getSigner();
       const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, ethersProvider)
       const buyMeACoffee2 = new ethers.Contract(contractAddress, contractABI, signer)


        console.log("getting coffee Id")
        const coffeeId = (await buyMeACoffee.coffeeId()).toString();
        console.log(coffeeId);

        const getCoffee = await buyMeACoffee2.getAllCoffee(coffeeId);

        console.log(getCoffee);
        setGetCoffee(getCoffee);
    } catch (error) {
      console.log(error);
    }
  };

  return (
     <main className='coffeeMain max-w-4xl min-h-[70vh] p-10 bg-black mt-20 rounded-2xl shadow-2xl m-auto flex flex-col justify-center items-center'>
        <div className='coffeContent'>
          <div className='compOne flex flex-col justify-center items-center'>
            <h1 className='text-white text-center text-2xl'>Buy me a coffee</h1>
            {/* { account ? 
            ( <button className='text-black bg-white p-3 rounded-lg mt-3 cursor-pointer' onClick={disconnectWallet}>Disconnect Wallet</button> )
            : ( <button className='text-black bg-white p-3 rounded-lg mt-3 cursor-pointer' onClick={connectWallet}>Connect Wallet</button> )
            } */}

            { account ?

            ( <div>
                <form onSubmit={buyCoffee} className="flex flex-col justify-center items-center mt-4">
                  <input type="text" placeholder="Enter your name" className="p-5 rounded-md bg-black text-white border-solid border-2 border-white outline-0" onChange={onNameChange} />
                  <input type="text" placeholder="Send your message" className="p-5 rounded-md bg-black text-white border-solid border-2 border-white mt-3 outline-0" onChange={onMessageChange}/>
                  <input type="submit" value="Send Coffee" className="p-3 mt-4 rounded-2xl bg-white text-black cursor-pointer"/>
                </form>
            </div> ) : (<button className='text-black bg-white p-3 rounded-lg mt-3 cursor-pointer' onClick={connectWallet} >Connect Wallet</button>) 
        
            }
          </div>

          <div className="comp2 flex flex-col justify-normal items-center">
            {account && ( 
              <div className="flex flex-row justify-between items-center mt-5 mb-3">
                  <h1 className="text-white text-2xl">Coffee Transaction</h1>
                  <button className="text-black bg-white p-2 rounded-2xl ml-3" onClick={getCoffee}>Get Memos</button>
              </div>
              ) }

              <div className="coffeeTransaction grid gap-4 grid-cols-2">

                {account && (coffee.map((coff, id) => {
                      return (
                        <div key={id} className=" border-solid border-2 border-white p-3 w-auto rounded-2xl mb-3">
                          <p className=" text-white font-bold">"{coff.message}"</p>
                          <p className=" text-white">From: {coff.name} at {`${new Date(coff.timestamp.toString() * 1000)}`}</p>
                        </div>
                      )
                }))}
              </div>

            </div>
        </div>
    </main>
  )
}
