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

exports.subscribeToTPGNewsletterBody = Joi.object().keys({

    email: Joi.string().email(emailOptions).lowercase().required()

});

exports.sendTPGFeedbackQuery = Joi.object().keys({

    location: Joi.string().valid('delhi', 'jaipur', 'kolkata', 'pune', 'bhopal', 'hyderabad', 'chennai', 'kerala', 'karnataka', 'ahmedabad', 'kualalumpur', 'main').required()

});

exports.sendTPGFeedbackBody = Joi.object().keys({

    email: Joi.string().required(),
    name: Joi.string().required(),
    message: Joi.string().required(),

});