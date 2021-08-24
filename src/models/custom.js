const { Schema } = require('mongoose');

const customSchema = new Schema({
    
    type: {
        type: Number
    },

    name: {
        type: String
    },

    text: {
        type: String
    },

    date: {
        type: Date
    },

    file: {
        type: String
    },

    fileType: {
        type: String
    }

});

/*
type:
0 - Text
1 - File
2 - Date
*/

module.exports = { customSchema };