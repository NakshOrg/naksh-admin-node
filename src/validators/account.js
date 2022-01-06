const { Joi } = require('celebrate');

const {
    emailOptions
} = require('./validatorOptions');

exports.loginBody = Joi.object().keys({

    email: Joi.string().email(emailOptions).required()

});

exports.verifyOtpBody = Joi.object().keys({

    email: Joi.string().email(emailOptions).required(),
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