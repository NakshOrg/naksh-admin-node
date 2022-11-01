const { Joi } = require('celebrate');

exports.s3PutpresignedUrlBody = Joi.object().keys({

    module: Joi.string().equal("organization", "artist", "artistImage").required(),
    artist: Joi.string().alphanum().length(24),
    totalFiles: Joi.number().min(1).max(10).required()
    
});