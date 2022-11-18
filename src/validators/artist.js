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
    twitterRegex,
    twitterRegexName,
    emailOptions
} = require('./validatorOptions');

exports.addArtistBody = Joi.object().keys({

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
    name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    description: Joi.string(),
    artform: Joi.string().alphanum().length(24),
    organization: Joi.string().alphanum().length(24),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    city: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    phone: Joi.string().pattern(phoneNumberRegex, phoneNumberRegexName),
    email: Joi.string().email(emailOptions),
    // wallet: Joi.string().pattern(walletRegex, walletRegexName).required(),
    wallet: Joi.string().required(),
    website: Joi.string().pattern(websiteRegex, websiteRegexName),
    facebook: Joi.string().pattern(facebookRegex, facebookRegexName),
    instagram: Joi.string().pattern(instagramRegex, instagramRegexName),
    twitter: Joi.string().pattern(twitterRegex, twitterRegexName),
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
    })),
    createdBy: Joi.number().equal(0, 1).default(0),
    creatorStatus: Joi.number().equal(0).default(0)

});

exports.updateArtistQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.updateArtistBody = Joi.object().keys({

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
    name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    description: Joi.string(),
    artform: Joi.string().alphanum().length(24),
    organization: Joi.string().alphanum().length(24),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    city: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    phone: Joi.string().pattern(phoneNumberRegex, phoneNumberRegexName),
    email: Joi.string().email(emailOptions),
    // wallet: Joi.string().pattern(walletRegex, walletRegexName),
    website: Joi.string().pattern(websiteRegex, websiteRegexName),
    facebook: Joi.string().pattern(facebookRegex, facebookRegexName),
    instagram: Joi.string().pattern(instagramRegex, instagramRegexName),
    twitter: Joi.string().pattern(twitterRegex, twitterRegexName),
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
    })),

    savedNft: Joi.array().items(Joi.string()),
    creatorStatus: Joi.number().equal(1)

});

exports.getAllArtistQuery = Joi.object().keys({

    sortBy: Joi.string().equal("createdAt", "name", "trending").required(),
    sort: Joi.number().equal(1,-1).required(),
    search: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    wallet: Joi.string(),
    id: Joi.string().alphanum().length(24),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    status: Joi.number().equal(0, 1),
    artform: Joi.string().alphanum().length(24),
    createdBy: Joi.number().equal(0, 1),
    creatorStatus: Joi.number().equal(0, 1)

});

exports.getOneArtistQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.getNftArtistsQuery = Joi.object().keys({

    artist: Joi.string().required(),
    owner: Joi.string().required(),

});

exports.saveNftQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.saveNftBody = Joi.object().keys({

    blockchain: Joi.number().equal(0, 1).required(),
    token: Joi.string().required(),
    address: Joi.string(),

});

exports.unsaveNftQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.unsaveNftBody = Joi.object().keys({

    blockchain: Joi.number().equal(0, 1).required(),
    token: Joi.string().required(),
    address: Joi.string(),

});