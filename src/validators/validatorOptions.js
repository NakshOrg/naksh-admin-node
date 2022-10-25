exports.alphaNumSpaceRegex = /^[a-zA-Z0-9 ]+$/;
exports.alphaNumSpaceRegexName = 'alphabets, numbers and space only';

exports.phoneNumberRegex = /^[0-9]{10}$/;
exports.phoneNumberRegexName = '10 digit number only';

exports.walletRegex = /^.+\.(near|testnet)$/;
exports.walletRegexName = 'NEAR wallet';

exports.websiteRegex = /^.+\..+$/;
exports.websiteRegexName = 'valid website only';

exports.facebookRegex = /^https:\/\/(www\.|m\.)?facebook\.com\/.+$/;
exports.facebookRegexName = 'https://www.facebook.com/ or https://m.facebook.com/ or https://facebook.com/';

exports.instagramRegex = /^https:\/\/(www\.|m\.)?instagram\.com\/.+$/;
exports.instagramRegexName = 'https://www.instagram.com/ or https://m.instagram.com/ or https://instagram.com/';

exports.emailOptions = {
    maxDomainSegments: 2
};