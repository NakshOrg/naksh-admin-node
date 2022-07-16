const { Joi } = require('celebrate');

exports.updateTrendingNftQuery = Joi.object().keys({

    blockchain: Joi.number().equal(0, 1).required(),
    token: Joi.string().alphanum().required()

});

exports.updateTrendingNftBody = Joi.object().keys({

    view: Joi.number().equal(1),
    sale: Joi.number().equal(1),
    trending: Joi.equal(1)

})
.without('sale', ['view'])
.without('view', ['sale']);