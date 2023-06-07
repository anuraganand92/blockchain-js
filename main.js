const Block = require("./block");
const Blockchain = require("./blockchain");

// Create a new instance of the blockchain
const blockchain = new Blockchain();

// Create a new block and add it to the blockchain
const newBlock = new Block(
  1,
  new Date().toString(),
  ['Some blockchain data here'],  // Data to be stored in the block (e.g. transactions)
  blockchain.getLatestBlock().hash
);
blockchain.mineBlock(newBlock);

// Validate the integrity of the blockchain
function validateChain() {
  for (let i = 1; i < blockchain.chain.length; i++) {
    const currentBlock = blockchain.chain[i];
    const previousBlock = blockchain.chain[i - 1];

    if (currentBlock.hash !== currentBlock.calculateHash()) {
      return false;
    }

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }

  return true;
}

console.log("Blockchain:", blockchain);
console.log("Blockchain Validity:", validateChain());
