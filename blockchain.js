const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, new Date().toString(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTransaction = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTransaction);

    const newBlock = new Block(
      this.chain.length,
      new Date().toString(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );

    this.mineBlock(newBlock);

    this.pendingTransactions = [];
  }

  mineBlock(newBlock) {
    while (
      newBlock.hash.substring(0, this.difficulty) !==
      Array(this.difficulty + 1).join("0")
    ) {
      newBlock.nonce++;
      newBlock.hash = newBlock.calculateHash();
    }

    this.chain.push(newBlock);
  }
}

module.exports = Blockchain;
