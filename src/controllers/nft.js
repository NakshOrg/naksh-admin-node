const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const fs = require('fs');
const path = require('path');

const multer = require('multer');
const uploadFile = multer(
    { dest: __dirname + '/../../uploads/' }
    ).fields([
    { name: 'nftImage', maxCount: 1 },
    { name: 'custom', maxCount: 10 }
]);

exports.uploadImageToIPFS = asyncHandler( async (req, res, next) => {

    uploadFile(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return next(new ErrorResponse(400, err.message ));
        } else if (err) {
          // An unknown error occurred when uploading.
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
        let custom = [];
    
        for(let nftImage of req.files.nftImage) {
    
            const readableStreamForFile = fs.createReadStream(nftImage.path);
    
            const options = {
                pinataMetadata: {
                    name: nftImage.originalname,
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
                return next(new ErrorResponse(400, "error uploading nft file to IPFS storage"));
            }
    
            nftImageUrl = `${process.env.PINATA_PREVIEW_URL}${upload.IpfsHash}`;
    
            fs.unlinkSync(nftImage.path);
            
        }
    
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
        
        return res.status(200).send({ nftImageUrl, custom });

    });

});