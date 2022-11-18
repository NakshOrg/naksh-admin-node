const { Joi } = require('celebrate');

const {
    alphaNumSpaceRegex,
    alphaNumSpaceRegexName,
    websiteRegex,
    websiteRegexName,
    facebookRegex,
    facebookRegexName,
    instagramRegex,
    instagramRegexName,
    twitterRegex,
    twitterRegexName
} = require('./validatorOptions');

exports.addCollectionBody = Joi.object().keys({

    image: Joi.string().allow(null),
    coverStatus: Joi.number().equal(0, 1),
    coverGradient: Joi.when('coverStatus', {
        is: 0,
        then: Joi.string().allow(null).required(),
        otherwise: Joi.forbidden()
    }),
    coverImage: Joi.when('coverStatus', {
        is: 1,
        then: Joi.string().allow(null).required(),
        otherwise: Joi.forbidden()
    }),
    name: Joi.string().required(),
    description: Joi.string(),
    artist: Joi.string().alphanum().length(24).required(),
    website: Joi.string().pattern(websiteRegex, websiteRegexName),
    facebook: Joi.string().pattern(facebookRegex, facebookRegexName),
    instagram: Joi.string().pattern(instagramRegex, instagramRegexName),
    twitter: Joi.string().pattern(twitterRegex, twitterRegexName),
    totalSale: Joi.number().default(0)

});

exports.updateCollectionQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.updateCollectionBody = Joi.object().keys({

    image: Joi.string().allow(null),
    coverStatus: Joi.number().equal(0, 1),
    coverGradient: Joi.when('coverStatus', {
        is: 0,
        then: Joi.string().allow(null).required(),
        otherwise: Joi.forbidden()
    }),
    coverImage: Joi.when('coverStatus', {
        is: 1,
        then: Joi.string().allow(null).required(),
        otherwise: Joi.forbidden()
    }),
    name: Joi.string(),
    description: Joi.string(),
    website: Joi.string().pattern(websiteRegex, websiteRegexName),
    facebook: Joi.string().pattern(facebookRegex, facebookRegexName),
    instagram: Joi.string().pattern(instagramRegex, instagramRegexName),
    twitter: Joi.string().pattern(twitterRegex, twitterRegexName),
    artist: Joi.string().alphanum().length(24),
    totalSale: Joi.number(),
    status: Joi.number().equal(0, 1)

});

exports.getAllCollectionQuery = Joi.object().keys({

    sortBy: Joi.string().equal("createdAt", "name").required(),
    sort: Joi.number().equal(1,-1).required()

});

exports.getOneCollectionQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.addNftToCollectionQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.addNftToCollectionBody = Joi.object().keys({

    tokens: Joi.string().required(),
    owners: Joi.string().required()

});

exports.addActivityToCollectionQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.addActivityToCollectionBody = Joi.object().keys({

    message: Joi.string().required(),
    amount: Joi.number()

});