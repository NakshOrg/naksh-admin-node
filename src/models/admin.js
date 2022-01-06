const { Schema, model } = require('mongoose');

const adminSchema = new Schema({

    email: {
        type: String
    },

    otp: {
        type: String,
        trim: true
    },

    otpExpiry: {
        type: Date
    },

    createdAt: {
        type: Date
    }
    
});

module.exports = model("Admin", adminSchema, "admins");