const { Joi } = require('celebrate');

exports.connectWalletQuery = Joi.object().keys({

    creatorAccountId: Joi.string().required(),
    newAccountId: Joi.string().required(),
    amount: Joi.string().required()

});

exports.accountDetailsQuery = Joi.object().keys({

    // account: Joi.string().required()

});