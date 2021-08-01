const { ErrorResponse } = require('../helpers/error');

const { asyncHandler } = require('../middlewares/asyncHandler');

exports.notFound = asyncHandler( async (req, res, next) => {
    
    return next(new ErrorResponse(404, 'route not found'));

});