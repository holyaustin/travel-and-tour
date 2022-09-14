import React, { useState } from 'react';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import injectedModule from '@web3-onboard/injected-wallets';
import Onboard from '@web3-onboard/core';

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];

const MAINNET_RPC_URL = 'https://polygon-mainnet.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V';
const MUMBAI_RPC_URL = 'https://polygon-mumbai.g.alchemy.com/v2/odpZQIbE3xtAii8qMNePX-0M6fyB8G0V';
const GOERLI_RPC_URL = 'ttps://eth-goerli.g.alchemy.com/v2/8wI2622GcVps389JCO4EOlQhoY_Bh8YP';

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: '0x137', // chain ID must be in hexadecimel
      token: 'MATIC',
      namespace: 'evm',
      label: 'Polygon Mainnet',
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: '0x80001',
      token: 'Matic',
      namespace: 'evm',
      label: 'Mumbai Testnet',
      rpcUrl: MUMBAI_RPC_URL,
    },
    {
      id: '0x4',
      token: 'rETH',
      namespace: 'evm',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: GOERLI_RPC_URL,
    },
  ],
  appMetadata: {
    name: 'Recyclant',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: 'Recycle waste and save our enviroment',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
});

const Coinbase = () => {
  // const { currentAccount } = useContext(TransactionContext);
  const [account, setAccount] = useState();

  const connectWallet2 = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts } = wallets[0];
      setAccount(accounts[0].address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full mf:flex-row flex-col justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 ">

          {/** {!currentAccount && ( )} */}
          <button
            type="button"
            onClick={connectWallet2}
            className="flex flex-row justify-center text-white items-center bg-blue-700 p-3 cursor-pointer hover:bg-blue-300 hover:text-black"
          >
            <p className="text-black text-3xl font-semibold hover:text-white">
              Connect Wallet
            </p>
          </button>

          <div className="text-black text-2xl font-semibold">
            <div>Connected Wallet Address: <br /> {account}</div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Coinbase;
