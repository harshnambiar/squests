import detectEthereumProvider from "@metamask/detect-provider"
import Web3 from "web3";
import { Octokit } from 'octokit';
import axios from 'axios';
import * as cheerio from "cheerio";

async function flush(){
    var url = window.location.toString();
    console.log(url);

}
window.flush = flush;

async function connect(code) {
    
  const provider = await detectEthereumProvider()

  if (provider && provider === window.ethereum) {
    console.log("MetaMask is available!");
    const chainId = 1946;
    console.log(window.ethereum.networkVersion);
    if (window.ethereum.networkVersion !== chainId) {
        const cid = '0x79A';
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: cid }]
        });
        console.log("changed to soneium testnet successfully");
        
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
        console.log("please add Soneium Minato Testnet as a network");
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Minato Testnet',
                chainId: cid,
                nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                rpcUrls: ['https://rpc.minato.soneium.org/']
              }
            ]
          });
        }
        else {
            console.log(err);
        }
      }
    }
    await startApp(provider);
  } else {
    console.log("Please install MetaMask!")
  }



}
window.connect = connect;


async function startApp(provider) {
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?")
  }
  else {
    const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      if (err.code === 4001) {
        console.log("Please connect to MetaMask.")
      } else {
        console.error(err)
      }
    })
  const account = accounts[0];
  var web3 = new Web3(window.ethereum);
  const bal = await web3.eth.getBalance(account);
  console.log(bal);
  console.log(account);
  }
}

async function star_quest(){
    const url = "https://cors-anywhere.herokuapp.com/https://github.com/harshnambiar?submit=Search&q=soneium_showcase&tab=stars&type=&sort=&direction=&submit=Search";
    try {
        const response = await axios.get(url);
        const selector = cheerio.load(response.data);
        var star_q = selector(".mb-1").text() || "none found";
        const i = star_q.indexOf("darksunlabs / soneium_showcase");
        if (i != -1){
            console.log("true");
        }
        else {
            console.log("false");
        }
    }
    catch (err){
        console.log(err);
    }
    
}
window.star_quest = star_quest;
