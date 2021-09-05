const { Schema } = require('mongoose');

const customSchema = new Schema({
    
    type: {
        type: Number
    },

    name: {
        type: String,
        trim: true
    },

    text: {
        type: String,
        trim: true
    },

    date: {
        type: String,
        trim: true
    },

    fileKey: {
        type: String,
        trim: true
    },

    fileUrl: {
        type: String,
        trim: true
    },

    fileType: {
        type: String,
        trim: true
    }

});

/*
type:
0 - Text
1 - File
2 - Date
*/

module.exports = { customSchema };