const { Joi } = require('celebrate');

const {
    alphaNumSpaceRegex,
    alphaNumSpaceRegexName,
    phoneNumberRegex,
    phoneNumberRegexName,
    walletRegex,
    walletRegexName,
    websiteRegex,
    websiteRegexName,
    facebookRegex,
    facebookRegexName,
    instagramRegex,
    instagramRegexName,
    emailOptions
} = require('./validatorOptions');

exports.addArtistBody = Joi.object().keys({

    image: Joi.string().allow(null),
    name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName).required(),
    description: Joi.string(),
    artform: Joi.string().alphanum().length(24),
    organization: Joi.string().alphanum().length(24),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    city: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    phone: Joi.string().pattern(phoneNumberRegex, phoneNumberRegexName),
    email: Joi.string().email(emailOptions),
    wallet: Joi.string().pattern(walletRegex, walletRegexName).required(),
    website: Joi.string().pattern(websiteRegex, websiteRegexName),
    facebook: Joi.string().pattern(facebookRegex, facebookRegexName),
    instagram: Joi.string().pattern(instagramRegex, instagramRegexName),
    custom: Joi.array().items(Joi.object().keys({
        type: Joi.number().equal(0,1,2).required(),
        name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName).required(),
        text: Joi.when('type', {
            is: Joi.equal(0),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        fileKey: Joi.when('type', {
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

    image: Joi.string().allow(null),
    name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    description: Joi.string(),
    artform: Joi.string().alphanum().length(24),
    organization: Joi.string().alphanum().length(24),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    city: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    phone: Joi.string().pattern(phoneNumberRegex, phoneNumberRegexName),
    email: Joi.string().email(emailOptions),
    wallet: Joi.string().pattern(walletRegex, walletRegexName),
    website: Joi.string().pattern(websiteRegex, websiteRegexName),
    facebook: Joi.string().pattern(facebookRegex, facebookRegexName),
    instagram: Joi.string().pattern(instagramRegex, instagramRegexName),
    status: Joi.number().equal(0, 1),
    custom: Joi.array().items(Joi.object().keys({
        type: Joi.number().equal(0,1,2).required(),
        name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName).required(),
        text: Joi.when('type', {
            is: Joi.equal(0),
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),
        fileKey: Joi.when('type', {
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

exports.getAllArtistQuery = Joi.object().keys({

    sortBy: Joi.string().equal("createdAt", "name").required(),
    sort: Joi.number().equal(1,-1).required(),
    search: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    wallet: Joi.string().pattern(walletRegex, walletRegexName),
    id: Joi.string().alphanum().length(24),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    status: Joi.number().equal(0, 1),
    artform: Joi.string().alphanum().length(24)

});

exports.getOneArtistQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});