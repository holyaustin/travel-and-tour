/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('@nomiclabs/hardhat-waffle');
const fs = require('fs');

const privateKey = fs.readFileSync('.secret').toString().trim() || '01234567890123456789';
// const alchemyId = fs.readFileSync('.alchemyid').toString().trim() || '';
require('dotenv').config();

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      // Alchemy
      url: 'https://rpc-mumbai.matic.today',
      accounts: [privateKey],
    },
    matic: {
      // Alchemy
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: [privateKey],
    },
    goerli: {
      // Alchemy
      url: process.env.GOERLI_RPC_URL,
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
