const { s3GetUrl } = require('../helpers/file');

const { asyncHandler } = require('../middlewares/asyncHandler');

exports.getOrganizationImages = asyncHandler(async ( organization ) => {

    if( organization.image && organization.image != null ) {
        organization.image = await s3GetUrl(organization.image);
    }

    for(let i = 0; i < organization.custom.length; i++) {
        if( organization.custom[i].type == 1 ) {
            organization.custom[i].fileUrl = await s3GetUrl(organization.custom[i].fileKey);
        }
    }
});

exports.getArtistImages = asyncHandler(async ( artist ) => {

    if( artist.image && artist.image != null ) {
        // artist.image = await s3GetUrl(artist.image);
    }
    
    if( artist.coverImage && artist.coverImage != null ) {
        artist.coverImage = await s3GetUrl(artist.coverImage);
    }

    for(let i = 0; i < artist.custom.length; i++) {
        if( artist.custom[i].type == 1 ) {
            artist.custom[i].fileUrl = await s3GetUrl(artist.custom[i].fileKey);
        }
    }
});

exports.getCollectionImages = asyncHandler(async ( collection ) => {

    if( collection.image && collection.image != null ) {
        collection.image = await s3GetUrl(collection.image);
    }
    
    if( collection.coverImage && collection.coverImage != null ) {
        collection.coverImage = await s3GetUrl(collection.coverImage);
    }
    
});