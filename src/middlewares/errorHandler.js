const { isCelebrateError } = require('celebrate');

exports.errorHandler = async (err, req, res, next) => {

    if (isCelebrateError(err)) {

        err.code = 400;
        err.location = err.details.keys().next().value;
        err.message = err.details.get(err.details.keys().next().value).details[0].message.replace(/"/g,"");

    }

    switch (err.code) {
        case 400:

            return res.status(err.code).send({ code: err.code, location: err.location,  error: err.message });

        break;
        
        case 401:

            return res.status(err.code).clearCookie('token').send({ error: err.message });

        break;

        case 404:

            return res.status(err.code).send({ error: err.message });

        break;
    
        default:

            return res.status(500).send({ error: err.message });
        
        break;

    }

};