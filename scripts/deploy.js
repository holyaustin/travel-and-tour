const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const Profile = await hre.ethers.getContractFactory('TourProfile');
  const profile = await Profile.deploy();
  await profile.deployed();
  console.log('Profile deployed to:', profile.address);

  fs.writeFileSync('./config3.js', `
  export const profileAddress = "${profile.address}"
  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
