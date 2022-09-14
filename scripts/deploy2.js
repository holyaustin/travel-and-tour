const hre = require('hardhat');
// const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const Register = await hre.ethers.getContractFactory('TouristRegister');
  const register = await Register.deploy();
  await register.deployed();
  console.log('Tour Guide register deployed to:', register.address);

  const TourTransfer = await hre.ethers.getContractFactory('Transfer');
  const tourTransfer = await TourTransfer.deploy(register.address);
  await tourTransfer.deployed();
  console.log('Transfer deployed to:', tourTransfer.address);

  const config = `
  export const registeraddress = '${register.address}'
  export const transferaddress = '${tourTransfer.address}'
  `;

  const data = JSON.stringify(config);
  fs.writeFileSync('config.js', JSON.parse(data));
  const data2 = JSON.stringify(config);
  fs.writeFileSync('./src/contractconfig.js', JSON.parse(data2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
