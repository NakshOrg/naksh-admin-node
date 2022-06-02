const { Schema, model, ObjectId } = require('mongoose');

const { customSchema } = require('./custom');

const artistSchema = new Schema({

    createdBy: {
        type: Number
    },

    image: {
        type: String
    },

    coverImage: {
        type: String
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

    custom: [ customSchema ],

    status: {
        type: Number
    },

    createdAt: {
        type: Date
    },

});

/*
! status:
0 - active
1 - inactive
! createdBy:
0 - admin
1 - client
*/

module.exports = model("Artist", artistSchema, "artists");