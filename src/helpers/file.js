const { v4: uuid } = require('uuid');

const S3 = require('aws-sdk/clients/s3');

const { logger } = require('../helpers/logger');

const { asyncHandler } = require('../middlewares/asyncHandler');

const s3 = new S3({
    apiVersion: '2006-03-01',
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
});

exports.s3PutUrl = asyncHandler(async ( module, totalFiles ) => {

    let putUrlArray = [];

    let s3Result;

    let params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Expires: 300
    };

    for(let i = 0; i < totalFiles; i++) {

        params.Key = `${module}/${uuid()}`;

        s3Result = await new Promise((resolve, reject) => {
            s3.getSignedUrl('putObject', params, (err, url) => {
                if(err) {
                    logger.error(err, "AWS PUT ERROR");
                    resolve({
                        err: err.message
                    });
                } else {
                    resolve({
                        Key: params.Key,
                        url
                    });
                }
            });
        });

        putUrlArray.push( s3Result );

    }

    return putUrlArray;

});

exports.s3ArtistPutUrl = asyncHandler(async ( module, artist, totalFiles ) => {

    let putUrlArray = [];

    let s3Result;

    let params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Expires: 300
    };

    for(let i = 0; i < totalFiles; i++) {

        params.Key = `${module}/${artist}`;

        s3Result = await new Promise((resolve, reject) => {
            s3.getSignedUrl('putObject', params, (err, url) => {
                if(err) {
                    logger.error(err, "AWS PUT ERROR");
                    resolve({
                        err: err.message
                    });
                } else {
                    resolve({
                        Key: params.Key,
                        url
                    });
                }
            });
        });

        putUrlArray.push( s3Result );

    }

    return putUrlArray;

});

exports.s3GetUrl = asyncHandler(async ( file ) => {

    let params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Expires: 300,
        Key: file
    };

    return await new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err, url) => {
            if(err) {
                logger.error(err, "AWS GET ERROR");
                resolve(params.Key);
            } else {
                resolve(url);
            }
        });
    });

});

exports.s3DeleteMultiple = asyncHandler(async ( files ) => {

    return await new Promise((resolve, reject) => {
        
        let params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {
                Objects: files,
                Quiet: true
            }
        };

        s3.deleteObjects(params, (err, data) => {
            if(err) {
                logger.error(err, "AWS DELETE ERROR");
                resolve(err);
            } else {
                resolve(data);
            }
        });
    });

});