const { Joi } = require('celebrate');

exports.addArtistBody = Joi.object().keys({

    image: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string(),
    artform: Joi.string().alphanum().length(24),
    organization: Joi.string().alphanum().length(24),
    state: Joi.string(),
    city: Joi.string(),
    phone: Joi.string().length(10).regex(/[0-9]/),
    email: Joi.string().email(),
    wallet: Joi.string().required(),
    website: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
    custom: Joi.array().items(Joi.object().keys({
        type: Joi.number().equal(0,1,2).required(),
        name: Joi.string().required(),
        text: Joi.when('type', {
            is: Joi.equal(0),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        file: Joi.when('type', {
            is: Joi.equal(1),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        fileType: Joi.when('type', {
            is: Joi.equal(1),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        date: Joi.when('type', {
            is: Joi.equal(2),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        })
    }))

});

exports.updateArtistQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.updateArtistBody = Joi.object().keys({

    image: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    artform: Joi.string().alphanum().length(24),
    organization: Joi.string().alphanum().length(24),
    state: Joi.string(),
    city: Joi.string(),
    phone: Joi.string().length(10).regex(/[0-9]/),
    email: Joi.string().email(),
    wallet: Joi.string(),
    website: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
    custom: Joi.array().items(Joi.object().keys({
        type: Joi.number().equal(0,1,2).required(),
        name: Joi.string().required(),
        text: Joi.when('type', {
            is: Joi.equal(0),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        file: Joi.when('type', {
            is: Joi.equal(1),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        fileType: Joi.when('type', {
            is: Joi.equal(1),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        date: Joi.when('type', {
            is: Joi.equal(2),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        })
    }))

});

exports.deactivateArtistQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.getAllArtistQuery = Joi.object().keys({

    sortBy: Joi.equal("createdAt", "name").required(),
    sort: Joi.equal("1","-1").required(),
    search: Joi.string(),
    state: Joi.string(),
    status: Joi.equal("0","1"),
    artform: Joi.string().alphanum().length(24)

});

exports.getOneArtistQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});