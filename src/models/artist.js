const { Schema, model, ObjectId } = require('mongoose');

const { customSchema } = require('./custom');

const artistSchema = new Schema({

    createdBy: {
        type: Number
    },

    creatorStatus: {
        type: Number,
        default: 0
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

    artform: {
        type: ObjectId
    },

    organization: {
        type: ObjectId
    },

    state: {
        type: String,
        trim: true
    },

    city: {
        type: String,
        trim: true
    },

    phone: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        trim: true
    },

    wallet: {
        type: String,
        trim: true,
        unique: true
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

    custom: [ customSchema ],

    status: {
        type: Number
    },

    sale: {
        type: Number
    },

    view: {
        type: Number
    },

    trending: {
        type: Number
    },

    savedNft: [{

        _id: false,

        blockchain: {
            type: Number
        },

        token: {
            type: String
        },

        address: {
            type: String
        }

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
! createdBy:
0 - admin
1 - client
! creatorStatus:
0 - user
1 - creator
*/

module.exports = model("Artist", artistSchema, "artists");