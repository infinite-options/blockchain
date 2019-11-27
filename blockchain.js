// Basic Block Chain 
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) +this.nonce).toString();
    }

    //Implementing Proof of Work for this block
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
            this.hash = this.calculateHash();
            this.nonce++;

        }

        console.log("Hash of the mined Block: " + this.hash);

    }
}

class BlockChain {

    constructor() {
        this.chain = [this.initiateFirstBlock()];
        this.difficulty = 4;
    }


    initiateFirstBlock() {

        return new Block(0, "10/07/2019", "Genesis Block", "abcd12345");
    }

    fetchLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.fetchLastBlock().hash;
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
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

let dataElementInit = new BlockChain();
dataElementInit.addNewBlock(new Block(1, "10/20/2019", {
    "Desc_Of_Block": "Farmer_Data_Element",
    "TimeStamp": "10/16/2019 13:00:00",
    "Amount_of_Produce": "20 lbs",
    "Producer_Name": "Esquivel Farm",
    "Description": "Tomatoes",
    "Farmer_Id": "DEF123",
    "Location": "Farmer Address"
}));
dataElementInit.addNewBlock(new Block(2, "10/20/2019", {
    "Desc_Of_Block": "Transport_Data_Element",
    "TimeStamp": "10/17/2019 8:00:00",
    "Amount_Of_Transport": "19.5 lbs",
    "Source": "Farmer Address",
    "Destination": " Market Name",
    "Medium_Of_Transport": "Truck"
}));
dataElementInit.addNewBlock(new Block(3, "10/20/2019", {
    "Desc_of_Block": "Market_Data_Element",
    "TimeStamp": "10/18/2019 10:00:00",
    "Source": "Farmer Address",
    "Destination": "Redistribution Address",
    "Amount_Available_For_Sale": "19 lbs",
    "Location": "Market Address"
}));
dataElementInit.addNewBlock(new Block(4, "10/20/2019", {
    "Desc_Of_Block": "Pickup_Data_Element",
    "TimeStamp": "10/19/2019 9:00:00",
    "Source": "Market Address",
    "Destination": "Redsitribution Address",
    "Amount_Of_Pickup": "19 lbs"
}));
dataElementInit.addNewBlock(new Block(5, "10/20/2019", {
    "Desc_Of_Block": "Redistribution_Data_Element",
    "TimeStamp": "10/19/2019 14:00:00",
    "Source": "Market Address",
    "Destination": "Delivery Address",
    "Amount_To_Be_Deliver": "18.5 lbs",
    "Location": "Redistribution Address"
}));
dataElementInit.addNewBlock(new Block(6, "10/20/2019", {
    "Desc_Of_Block": "Customer_Data_Element",
    "TimeStamp": "10/19/2019 17:00:00",
    "Amount_Delivered": "18 lbs",
    "Amount_Questionable": "0.5 lbs",
    "Feedback": "Good Service!!!"   
}));

console.log('Is my Blockchain Valid?' + dataElementInit.isValidChain());
console.log(JSON.stringify(dataElementInit, null, 4));

//  Intentionally tampering the data and checking the integrity of the blockchain
//poojanCoin.chain[1].data = { amount: 100 };
//poojanCoin.chain[1].hash = poojanCoin.chain[1].calculateHash();
//console.log('Is my Blockchain Valid?' + poojanCoin.isValidChain());
