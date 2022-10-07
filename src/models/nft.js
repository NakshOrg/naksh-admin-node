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

    block: {
        type: Number
    },

});

/*
! blockchain:
0 - Near
1 - Polygon
! block
0 - active
1 - blocked
*/

module.exports = model("Nft", nftSchema, "nfts");