const { Schema, model } = require('mongoose');

const TPGSubscriberSchema = new Schema({

    email: String,

    createdAt: Date
    
});

module.exports = model("TPGSubscriber", TPGSubscriberSchema, "TPGSubscribers");