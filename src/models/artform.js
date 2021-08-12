const { Schema, model } = require('mongoose');

const artFormSchema = new Schema({

    name: {
        type: String,
        trim: true
    },

    createdAt: {
        type: Date
    }
    
});

module.exports = model("Artform", artFormSchema, "artforms");