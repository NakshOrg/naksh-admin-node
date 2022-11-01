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
        artist.image = `https://naksh-dev.s3.ap-south-1.amazonaws.com/${artist.image}`;
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