const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const uploadFile = multer({ dest: 'uploads/' }).single('image');

exports.uploadImageToIPFS = asyncHandler( async (req, res, next) => {

    // uploadFile(req, res, async (err) => {
    //     if (err instanceof multer.MulterError) {
    //       // A Multer error occurred when uploading.
    //     } else if (err) {
    //       // An unknown error occurred when uploading.
    //     }
    
    //     // Everything went fine.

    //     const auth = await pinata.testAuthentication();

    //     if(auth.authenticated != true) {
    //         return next(new ErrorResponse(503, "server could not reach IPFS storage"));
    //     }

    //     // return res.status(200).send({ file: req.file });

    //     const readableStreamForFile = fs.createReadStream(path.join(__dirname, `../../${req.file.path}`));

    //     const options = {
    //         pinataMetadata: {
    //             name: req.file.filename,
    //             keyvalues: {
    //                 customKey: 'customValue',
    //                 issuedAt: Date.now().toString(),
    //                 issuedBy: "naksh"
    //             }
    //         },
    //         pinataOptions: {
    //             cidVersion: 0
    //         }
    //     };

    //     const upload = await pinata.pinFileToIPFS(readableStreamForFile, options);

    //     if(upload.IpfsHash == (undefined || null || "")) {
    //         return next(new ErrorResponse(400, "error uploading file to IPFS storage"));
    //     }

    //     const url = `${process.env.PINATA_PREVIEW_URL}${upload.IpfsHash}`;

    //     fs.unlinkSync(path.join(__dirname, `../../${req.file.path}`));
        
        

    // });

    return res.status(200).send({ url: "https://gateway.pinata.cloud/ipfs/Qmag81KE1agXXfbvouoxxcyEVu7DPFDZbLcoWwb2Zhei1E" });

});