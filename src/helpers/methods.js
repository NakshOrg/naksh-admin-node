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