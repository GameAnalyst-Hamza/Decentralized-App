# Sample Hardhat Project - Smart Contract Creation

This project serves as an illustrative example of Hardhat usage, featuring a sample Smart Contract, a corresponding Test Script, and a Deployment Script.

## Getting Started

To run the following commands, ensure that you have [Node.js](https://nodejs.org) installed.

1. Install project dependencies:

    ```shell
    npm install
    ```

2. Start a local Hardhat node:

    ```shell
    npx hardhat node
    ```

3. Run tests:

    ```shell
    npx hardhat run --network hardhat test/Collection.js
    ```

4. Deploy the smart contract (replace `sepolia` with your desired network):

    ```shell
    npx hardhat run scripts/deploy.js --network sepolia
    ```

Feel free to explore and modify the provided smart contract, test, and deployment script to suit your needs.