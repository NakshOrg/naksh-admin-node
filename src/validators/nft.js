const { Joi } = require('celebrate');

exports.updateTrendingNftQuery = Joi.object().keys({

    blockchain: Joi.number().equal(0, 1).required(),
    token: Joi.string().required(),
    artist: Joi.string().alphanum().length(24).required()

});

exports.updateTrendingNftBody = Joi
.object() .keys({

    view: Joi.number().equal(1),
    sale: Joi.number().equal(1)

})
.xor('sale', 'view');

exports.getTrendingNftQuery = Joi.object().keys({

    blockchain: Joi.number().equal(0, 1).required()

});