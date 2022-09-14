const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const Memory = await hre.ethers.getContractFactory('TourMemory');
  const memory = await Memory.deploy();
  await memory.deployed();
  console.log('Memory deployed to:', memory.address);

  fs.writeFileSync('./config4.js', `
  export const MemoryAddress = "${memory.address}"
  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
