const { s3PutUrl, s3ArtistPutUrl } = require('../helpers/file');

const { asyncHandler } = require('../middlewares/asyncHandler');

exports.s3PutpresignedUrl = asyncHandler( async (req, res, next) => {

    let urls = [];
    
    if(req.body.hasOwnProperty("artist")) {
        
        urls = await s3ArtistPutUrl(req.body.module, req.body.artist, req.body.totalFiles);
    } else {

        urls = await s3PutUrl(req.body.module, req.body.totalFiles);
    }

    return res.status(200).send({ urls });

});