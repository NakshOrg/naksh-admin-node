const { Schema, model } = require('mongoose');

const TPGAdminSchema = new Schema({

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

module.exports = model("TPGAdmin", TPGAdminSchema, "TPGAdmins");