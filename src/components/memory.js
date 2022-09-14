/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { NFTStorage } from 'nft.storage';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import Abi from '../api/TourMemory.json';
import { memoryAddress } from '../config4';
import Header from './Header/Header';

// eslint-disable-next-line max-len
const APIKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4Zjc4ODAwMkUzZDAwNEIxMDI3NTFGMUQ0OTJlNmI1NjNFODE3NmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzA1NjE4NzM4MCwibmFtZSI6InBlbnNpb25maSJ9.agI-2V-FeK_eVRAZ-T6KGGfE9ltWrTUQ7brFzzYVwdM';

const Memory = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: '', description: '',  price: '' });

  const handleFileUpload = (event) => {
    console.log('file for upload selected...');
    setUploadedFile(event.target.files[0]);
    setTxStatus('');
    setImageView('');
    setMetaDataURl('');
    setTxURL('');
  };

  const uploadNFTContent = async (inputFile) => {
    const { name, description, price } = formInput;
    if (!name || !description || !inputFile) return;
    const nftStorage = new NFTStorage({ token: APIKEY });
    try {
      console.log('Trying to upload asset to ipfs');
      setTxStatus('Uploading Item to IPFS & Filecoin via NFT.storage.');
      const metaData = await nftStorage.store({
        name,
        description,
        image: inputFile,
      });
      setMetaDataURl(metaData.url);
      console.log('metadata is: ', { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage('Could not save Profile to NFT.Storage - Aborted minting.');
      console.log('Error Uploading Content', error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus('Adding transaction to Goerli Blockchain.');
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const price = ethers.utils.parseUnits(formInput.price, 'ether');
      const connectedContract = new ethers.Contract(memoryAddress, Abi.abi, provider.getSigner());
      console.log('Connected to contract', memoryAddress);
      console.log('IPFS blockchain uri is ', metadata.url);

      const mintNFTTx = await connectedContract.createToken(metadata.url, price);
      console.log('Profile successfully created and sent to Blockchain');
      // await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage('Failed to send tx to Goerli.');
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log('getIPFSGatewayURL2 two is ...');
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    const explorerUrl = `https://goerli.etherscan.io/tx/${mintNFTTx.hash}`;
    console.log('image ipfs path is', imgViewString);
    console.log('View Tx on Blockchain here ', explorerUrl);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://goerli.etherscan.io/tx/${mintNFTTx.hash}`);
    setTxStatus('Profile registration was successfully!');
    console.log('Preview details completed');
  };

  const mintNFTToken = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload NFT content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Polygon
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
    previewNFT(metaData, mintNFTTx);

   // navigate('/View');
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split('/');
    // console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    // console.log("ipfsGateWayURL = ", ipfsGateWayURL)
    return ipfsGateWayURL;
  };

  return (
  
    <><Header /><div className="flex justify-center  bg-blue-300 mb-50">
      
      <div className="w-1/2 flex flex-col mt-15 mb-20 pt-8 pb-20 text-center text-2xl">
      <h1>Mint your Memories as NFTs</h1>
      <input
          placeholder="Give it a Title"
          className="mt-4 border rounded p-2"
          onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })} />
        <input
          placeholder="Describe the event"
          className="mt-4 border rounded p-2"
          onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })} />
        <input
          placeholder="Enter price in USD"
          className="mt-4 border rounded p-2"
          onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })} />
            <form className='pt-4'>
              <h3>Select the picture </h3>
              <input type="file" onChange={handleFileUpload} className="mt-1 border rounded p-4 text-xl w-full" />
            </form>
            {txStatus && <p>{txStatus}</p>}
            <br />
            {metaDataURL && <p className="text-blue"><a href={metaDataURL} className="text-blue">Metadata on IPFS</a></p>}
            <br />
            {txURL && <p><a href={txURL} className="text-blue">See the mint transaction</a></p>}
            <br />
            {errorMessage}

            <br />
            {imageView && (
              <img
                className="mb-10"
                title="Ebook "
                src={imageView}
                alt="NFT preview"
                frameBorder="0"
                scrolling="auto"
                height="50%"
                width="100%" />
            )}

          <button type="button" onClick={(e) => mintNFTToken(e, uploadedFile)} className="font-bold bg-blue-500 text-white text-2xl rounded p-2 shadow-lg mb-32">
            Mint Memory as NFT
          </button>
      </div>  
      </div></>
  
  );
};
export default Memory;
