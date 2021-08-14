const { Joi } = require('celebrate');

exports.s3PutpresignedUrlBody = Joi.object().keys({

    module: Joi.string().equal("organization", "artist").required(),
    totalFiles: Joi.number().min(1).max(10).required()
    
});