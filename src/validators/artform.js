const { Joi } = require('celebrate');

exports.addArtFormBody = Joi.object().keys({

    artforms: Joi.array().items(Joi.string()).min(1).required()

});

exports.updateArtFormQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.updateArtFormBody = Joi.object().keys({

    name: Joi.string().required()

});

exports.deleteArtFormQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});

exports.getOneArtFormQuery = Joi.object().keys({

    id: Joi.string().alphanum().length(24).required()

});