const { Joi } = require('celebrate');

exports.verifyOtpBody = Joi.object().keys({

    otp: Joi.string().required()

});

exports.connectWalletQuery = Joi.object().keys({

    creatorAccountId: Joi.string().required(),
    newAccountId: Joi.string().required(),
    amount: Joi.string().required()

});

exports.accountDetailsQuery = Joi.object().keys({

    // account: Joi.string().required()

});