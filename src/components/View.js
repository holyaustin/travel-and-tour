/* eslint-disable no-use-before-define */
/* pages/index.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Web3Modal from "web3modal";
import Abi from '../api/TourProfile.json';
import { profileAddress } from '../config3';
import Header from './Header/Header';
// require('dotenv').config();

export default function Sender() {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    loadGuide();
  }, []);
  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  // const rpcUrl = "https://matic-mumbai.chainstacklabs.com";
  // const rpcUrl = "http://localhost:8545";
   const rpcUrl = "https://eth-goerli.g.alchemy.com/v2/8wI2622GcVps389JCO4EOlQhoY_Bh8YP"//process.env.GOERLI_RPC_URL;

  async function loadGuide() {
    
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(profileAddress, Abi.abi, provider);
    const data = await contract.fetchMarketItems();
    console.log("profile data fetched from contract", data);
    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    // eslint-disable-next-line arrow-parens
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");

      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        country: meta.data.properties.country,
        city: meta.data.properties.city,
        wallet: meta.data.properties.wallet,
      };
      console.log("item returned is ", item);
      return item;
    }));
    setNfts(items);
    setLoadingState("loaded");
  }
  async function StreamPayment(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
   
    navigate("/Hire");
  }
  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div>
        <h1 className="px-20 py-10 text-3xl">No Entries yet</h1>
      </div>
    );
  }
  return (
    <><Header /><div className="flex justify-center bg-blue-300 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              <img
                title="Profile"
                frameBorder="0"
                scrolling="no"
                height="400px"
                width="100%"
                src={`${nft.image}#toolbar=0`}
                className="py-3 object-fill h-500" />
              <div className="p-1">
                <p style={{ height: "34px" }} className="text-xl text-blue-800 font-semibold">Name: {nft.name}</p>
                <div style={{ height: "60px", overflow: "hidden" }}>
                  <p className="text-gray-800">Brief Description: {nft.description}</p>
                </div>
                <p style={{ height: "34px" }} className="text-xl font-semibold">Country: {nft.country}</p>
                <div style={{ height: "50px", overflow: "hidden" }}>
                  <p className="text-gray-700">ETH Wallet Address: {nft.wallet}</p>
                </div>
                <p className="text-xl font-bold text-red-500"> City: {nft.city}</p>
                <p className="text-xl font-bold text-black">Amount per day {nft.price} USD</p>
              </div>

              <div className="p-2 bg-black">
                <button type="button" className=" w-full bg-blue-800 text-white font-bold py-2 px-12 rounded" onClick={() => StreamPayment(nft)}>Hire this Tour Guide</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div></>
  );
}
