const { Joi } = require('celebrate');

exports.accountDetailsQuery = Joi.object().keys({

    account: Joi.string().required()

});