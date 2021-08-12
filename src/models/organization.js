const { Schema, model } = require('mongoose');

const organizationSchema = new Schema({

    image: {
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
    }

});

module.exports = model("Organization", organizationSchema, "organizations");