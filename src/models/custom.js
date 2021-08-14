const { Schema } = require('mongoose');

const customSchema = new Schema({
    
    type: {
        type: Number
    },

    name: {
        type: String
    },

    value: {
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