const { s3PutUrl } = require('../helpers/file');

const { asyncHandler } = require('../middlewares/asyncHandler');

exports.s3PutpresignedUrl = asyncHandler( async (req, res, next) => {
    
    const urls = await s3PutUrl(req.body.module, req.body.totalFiles);

    return res.status(200).send({ urls });

});