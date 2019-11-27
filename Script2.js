// Basic Block Chain 
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {

    constructor() {
        this.chain = [this.initiateFirstBlock()];
    }


    initiateFirstBlock() {

        return new Block(0, "10/07/2019", "Genesis Block", "abcd12345");
    }

    fetchLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.fetchLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValidChain() {
        
        for (var i = 1; i < this.chain.length; i++){
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }

        }

        return true;
    }
}

let poojanCoin = new BlockChain();
poojanCoin.addNewBlock(new Block(1, "10/07/2019", { amount: 10 }));
poojanCoin.addNewBlock(new Block(2, "10/07/2019", { amount: 15 }));

console.log('Is my Blockchain Valid?' + poojanCoin.isValidChain());
console.log(JSON.stringify(poojanCoin, null, 4));

