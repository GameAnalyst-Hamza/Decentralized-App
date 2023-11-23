//Modified code this runs on Local Machine

const { expect, assert } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("NFT Minting Contract", function () {
  let owner, ad1, ad2, ad3;
  let Collection;
  let price, limit, max_supply;

  this.beforeEach(async function () {
    [owner, ad1, ad2, ad3, ...address] = await ethers.getSigners();

    price = ethers.utils.parseEther("0.0001");
    limit = 3;
    max_supply = 1000;

    Collection = await ethers.getContractFactory("Collection");
    Collection = await Collection.deploy();
  });

  it("It - Deploy Contract", async function () {
    assert.ok(Collection.address);
  });

  describe("Describe - Collection Contract Set Parameters", function () {
    it("Should set NFT Price", async function () {
      await Collection.setPrice(price);
      expect(await Collection.PRICE_PER_TOKEN()).to.equal(price);
    });

    it("It - Should set Minting Limit per Address", async function () {
      await Collection.setLimit(limit);
      expect(await Collection.LIMIT_PER_ADDRESS()).to.equal(limit);
    });

    it("It - Should set Max NFT Supply", async function () {
      await Collection.setMaxSupply(max_supply);
      expect(await Collection.MAX_SUPPLY()).to.equal(max_supply);
    });
  });

  describe("Describe - Collection Contract Mint NFT", function () {
    it("It - Should Mint NFT to User Account Address", async function () {
      let user = Collection.connect(ad1);
      let priceInWei = ethers.utils.parseEther("0.0001");
      await user.mintNFT("1", { value: priceInWei });
      expect(await Collection.tokenIds()).to.equal(1);
      expect(await Collection.totalMinted()).to.equal(1);
    });
  });

  describe("Describe - Withdraw Money by Owner", function () {
    it("It - Should Withdraw Money to Owner Account Address", async function () {
      let ownerContract = Collection.connect(owner);
      await ownerContract.withdrawMoney();
      const balance = await ethers.provider.getBalance(Collection.address);
      expect(balance).to.equal(0);
    });

    it("It - Should not Withdraw Money to Any other Account Address", async function () {
      let user = Collection.connect(ad1);
      await expect(user.withdrawMoney()).to.be.revertedWith(
        "Ownable: Caller is not the owner"
      );
    });
  });
});