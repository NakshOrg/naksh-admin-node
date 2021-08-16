const { s3GetUrl } = require('../helpers/file');

exports.getOrganizationImages = async ( organization ) => {

    if( organization.image ) {
        organization.image = await s3GetUrl(organization.image);
    }

    for(let i = 0; i < organization.custom.length; i++) {
        if( organization.custom[i].type == 1 ) {
            organization.custom[i].value = await s3GetUrl(organization.custom[i].value);
        }
    }
}

exports.getArtistImages = async ( artist ) => {

    if( artist.image ) {
        artist.image = await s3GetUrl(artist.image);
    }

    for(let i = 0; i < artist.custom.length; i++) {
        if( artist.custom[i].type == 1 ) {
            artist.custom[i].value = await s3GetUrl(artist.custom[i].value);
        }
    }
}