const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const Nft = require('../models/nft');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const fs = require('fs');

const multer = require('multer');
const uploadFile = multer(
    { dest: __dirname + '/../../uploads/' }
    ).fields([
    { name: 'nftImage', maxCount: 1 },
    { name: 'custom', maxCount: 10 }
]);

const Jimp = require('jimp');

exports.uploadImageToIPFS = asyncHandler( async (req, res, next) => {

    uploadFile(req, res, async (err) => {

        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log({ "one": err });
          return next(new ErrorResponse(400, err.message ));
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log({ "two": err });
          return next(new ErrorResponse(400, err.message ));
        }
    
        // Everything went fine.

        if(req.files.nftImage.length == 0) {
            return next(new ErrorResponse(400, "NFT image required"));
        }
    
        const auth = await pinata.testAuthentication();
    
        if(auth.authenticated != true) {
            return next(new ErrorResponse(503, "server could not reach IPFS storage"));
        }
    
        let nftImageUrl = "";
        let nftThumbnailUrl = "";
        let custom = [];
    
        for(let nftImage of req.files.nftImage) {
    
            const readableStreamForNFT = fs.createReadStream(nftImage.path);
    
            const optionsNFT = {
                pinataMetadata: {
                    name: nftImage.originalname,
                    keyvalues: {
                        issuedAt: Date.now().toString(),
                        issuedBy: "naksh"
                    }
                },
                pinataOptions: {
                    cidVersion: 0
                }
            };
    
            const uploadNFT = await pinata.pinFileToIPFS(readableStreamForNFT, optionsNFT);
    
            if(uploadNFT.IpfsHash == (undefined || null || "")) {
                return next(new ErrorResponse(400, "error uploading nft file to IPFS storage"));
            }
    
            nftImageUrl = `${process.env.PINATA_PREVIEW_URL}${uploadNFT.IpfsHash}`;
            
            const uncompressedImage = await Jimp.read(nftImage.path);
            await uncompressedImage.quality(10).writeAsync(nftImage.path);

            const readableStreamForThumbnail = fs.createReadStream(nftImage.path);
    
            const optionsThumbnail = {
                pinataMetadata: {
                    name: `thumbnail_${nftImage.originalname}`,
                    keyvalues: {
                        issuedAt: Date.now().toString(),
                        issuedBy: "naksh"
                    }
                },
                pinataOptions: {
                    cidVersion: 0
                }
            };
    
            const uploadThumbnail = await pinata.pinFileToIPFS(readableStreamForThumbnail, optionsThumbnail);
    
            if(uploadThumbnail.IpfsHash == (undefined || null || "")) {
                return next(new ErrorResponse(400, "error uploading nft file to IPFS storage"));
            }
    
            nftThumbnailUrl = `${process.env.PINATA_PREVIEW_URL}${uploadThumbnail.IpfsHash}`;
    
            fs.unlinkSync(nftImage.path);
            
        }

        if( Array.isArray(req.files.custom) ) {

            for(let customImage of req.files.custom) {
    
                const readableStreamForFile = fs.createReadStream(customImage.path);
        
                const options = {
                    pinataMetadata: {
                        name: customImage.originalname,
                        keyvalues: {
                            customKey: 'customValue',
                            issuedAt: Date.now().toString(),
                            issuedBy: "naksh"
                        }
                    },
                    pinataOptions: {
                        cidVersion: 0
                    }
                };
        
                const upload = await pinata.pinFileToIPFS(readableStreamForFile, options);
        
                if(upload.IpfsHash == (undefined || null || "")) {
                    return next(new ErrorResponse(400, "error uploading custom file to IPFS storage"));
                }
        
                custom.push(`${process.env.PINATA_PREVIEW_URL}${upload.IpfsHash}`);
        
                fs.unlinkSync(customImage.path);
            }

        }
        
        return res.status(200).send({ nftImageUrl, nftThumbnailUrl, custom });

    });

});

exports.updateTrendingNft = asyncHandler(async (req, res, next) => {

    const nft = await Nft.findOneAndUpdate({ token: req.query.token }, { $inc: { ...req.body } }, { upsert: true, new: true });

    if(!nft) {
        return next(new ErrorResponse(404, "nft not found"));
    }

    return res.status(200).send({ nft });
});

exports.getTrendingNft = asyncHandler(async (req, res, next) => {

    const aggregateParams = [];

    const sortByTrending = {
        trending: -1
    };

    aggregateParams.push({ $sort: sortByTrending });

    const limit = 10;

    aggregateParams.push({ $limit: limit });
    
    const trendingMatch = {
        trending: { $gt: 0 }
    };

    aggregateParams.push({ $match: trendingMatch });

    const nfts = await Nft.aggregate(aggregateParams).collation({locale: "en"});

    return res.status(200).send({ nfts });
});