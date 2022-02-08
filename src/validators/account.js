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