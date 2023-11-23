const hre = require("hardhat");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

async function main() {
  const Collection = await hre.ethers.getContractFactory("Collection");
  const collection = await Collection.deploy();
  // await collection.deployed();

  console.log(`Contract is deployed with Address: ${collection.address}`);

  console.log("API URL " + API_URL);
  console.log("Private Key " + PRIVATE_KEY);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
