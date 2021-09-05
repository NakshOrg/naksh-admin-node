const { Joi } = require('celebrate');

const alphaNumSpaceRegex = /^[a-zA-Z0-9 ]+$/;
const alphaNumSpaceRegexName = 'alphabets, numbers and space only';

const phoneNumberRegex = /^[0-9]{10}$/;
const phoneNumberRegexName = '10 digit number only';

const websitelRegex = /^.+\..+$/;
const websiteRegexName = 'valid website only';

const facebookRegex = /^https:\/\/(www\.|m\.)?facebook\.com\/.+$/;
const facebookRegexName = 'https://www.facebook.com/ or https://m.facebook.com/ or https://facebook.com/';

const instagramRegex = /^https:\/\/(www\.|m\.)?instagram\.com\/.+$/;
const instagramRegexName = 'https://www.instagram.com/ or https://m.instagram.com/ or https://instagram.com/';

const emailOptions = {
    maxDomainSegments: 2
};

exports.addOrganizationBody = Joi.object().keys({

    image: Joi.string(),
    name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName).required(),
    description: Joi.string(),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    city: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    phone: Joi.string().pattern(phoneNumberRegex, phoneNumberRegexName),
    email: Joi.string().email(emailOptions),
    website: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
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

exports.updateOrganizationQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.updateOrganizationBody = Joi.object().keys({

    image: Joi.string(),
    name: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    description: Joi.string(),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    city: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    phone: Joi.string().pattern(phoneNumberRegex, phoneNumberRegexName),
    email: Joi.string().email(emailOptions),
    website: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
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

exports.deleteOrganizationQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.getAllOrganizationQuery = Joi.object().keys({

    sortBy: Joi.string().equal("createdAt", "name").required(),
    sort: Joi.number().equal(1, -1).required(),
    search: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName),
    state: Joi.string().pattern(alphaNumSpaceRegex, alphaNumSpaceRegexName)

});

exports.getOneOrganizationQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});