const { Joi } = require('celebrate');

exports.addOrganizationBody = Joi.object().keys({

    image: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    phone: Joi.string().length(10).regex(/[0-9]/),
    email: Joi.string().email(),
    website: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
    custom: Joi.array().items(Joi.object().keys({
        type: Joi.number().equal(0,1,2).required(),
        name: Joi.string().required(),
        value: Joi.string().required()
    }))

});

exports.updateOrganizationQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.updateOrganizationBody = Joi.object().keys({

    image: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    phone: Joi.string().length(10).regex(/[0-9]/),
    email: Joi.string().email(),
    website: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
    custom: Joi.array().items(Joi.object().keys({
        type: Joi.number().equal(0,1,2).required(),
        name: Joi.string().required(),
        value: Joi.string().required()
    }))

});

exports.deleteOrganizationQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.getOneOrganizationQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});