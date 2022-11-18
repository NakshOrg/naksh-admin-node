const { Schema, model, ObjectId } = require('mongoose');

const collectionSchema = new Schema({

    artist: {
        type: ObjectId
    },

    image: {
        type: String
    },

    coverStatus: {
        type: Number,
        default: 0
    },

    coverImage: {
        type: String
    },

    coverGradient: {
        type: String,
        default: "linear-gradient(90.14deg, #49BEFF 0.11%, #6E3CFF 99.88%)"
    },

    name: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    website: {
        type: String,
        trim: true
    },

    facebook: {
        type: String,
        trim: true
    },

    instagram: {
        type: String,
        trim: true
    },

    twitter: {
        type: String,
        trim: true
    },

    status: {
        type: Number
    },

    tokens: [{
        type: String
    }],

    owners: [{
        type: String
    }],

    totalSale: {
        type: Number
    },

    activity: [{

        message: {
            type: String
        },

        amount: {
            type: Number
        },

        createdAt: {
            type: Date
        },

    }],

    createdAt: {
        type: Date
    },

});

/*
! status:
0 - active
1 - inactive
! coverStatus:
0 - gradient
1 - image
*/

module.exports = model("Collection", collectionSchema, "collections");