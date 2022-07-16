const { Schema, model, ObjectId } = require('mongoose');

const nftSchema = new Schema({

    blockchain: {
        type: Number
    },

    token: {
        type: String
    },

    view: {
        type: Number
    },

    sale: {
        type: Number
    },

    trending: {
        type: Number
    },

});

/*
! blockchain:
0 - Near
1 - Harmony
*/

module.exports = model("Nft", nftSchema, "nfts");