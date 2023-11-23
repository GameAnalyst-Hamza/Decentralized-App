// // Exact Same Code as 10 Pearls
// const { expect, assert } = require("chai");
// const { ethers, waffle } = require("hardhat");

// describe("NFT Minting Contract", function () {
//     let owner, ad1, ad2, ad3;
//     let Collection;

//     beforeEach(async function () {
//         [owner, ad1, ad2, ad3, ...addrs] = await ethers.getSigners();

//         Collection = await ethers.getContractFactory("Collection");
//         Collection = await Collection.deploy();
//     });

//     it("It - Deploy Contract", async function () {
//         assert.ok(Collection.address);
//     });

//     //Describe
//     describe("Describe - Collection Contract Set Parameters", function () {
//         let price = ethers.utils.parseEther("0.0001");
//         let limit = 3;
//         let max_supply = 1000;

//         it("It - Should set NFT Price", async function () {
//             await Collection.setPrice(price);
//             expect(await Collection.PRICE_PER_TOKEN()).to.equal(price);
//         });

//         it("It - Should set Minting Limit per Address", async function () {
//             await Collection.setLimit(limit);
//             expect(await Collection.LIMIT_PER_ADDRESS()).to.equal(limit);
//         });

//         it("It - Should set Max NFT Supply", async function () {
//             await Collection.setMaxSupply(max_supply);
//             expect(await Collection.MAX_SUPPLY()).to.equal(max_supply);
//         });
//     });

//     //Describe
//     describe("Describe - Collection Contract Mint NFT", function () {
//         it("It - Should Mint NFT to User Account Address", async function () {
//             let price = ethers.utils.parseEther("0.0001");
//             let user = await Collection.connect(ad1);
//             await user.mintNFT("1", { value: price });
//             expect(await Collection.tokenIds()).to.equal(1);
//             expect(await Collection.totalMinted()).to.equal(1);
//         });
//     });

//     //Describe
//     describe("Describe - Withdraw Money by Owner", function () {
//         it("It - Should Withdraw Money to Owner Account Address", async function () {
//             let Owner = Collection.connect(owner);
//             await Owner.withdrawMoney();
//             const balance = await ethers.provider.getBalance(Collection.address);
//             expect(balance).to.equal(0);
//         });

//         it("It - Should not Withdraw Money to any other Account Address", async function () {
//             let User = Collection.connect(ad2);
//             await expect(User.withdrawMoney()).to.be.revertedWith(
//                 "Ownable: Caller is not the owner"
//             );
//         });
//     });
// });
