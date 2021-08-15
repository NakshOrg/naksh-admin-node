const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');
const { getOrganizationImages } = require('../helpers/methods');

const Organization = require('../models/organization');

exports.addOrganization = asyncHandler(async (req, res, next) => {

    const organization = await new Organization(req.body).save();

    await getOrganizationImages( organization );

    return res.status(201).send({ organization });
});

exports.updateOrganization = asyncHandler(async (req, res, next) => {

    const organization = await Organization.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true });

    if(!organization) {
        return next(new ErrorResponse(404, "organization not found"));
    }

    await getOrganizationImages( organization );

    return res.status(200).send({ organization });
});

// !What happens to artists under deleted organization?
exports.deleteOrganization = asyncHandler(async (req, res, next) => {

    const organization = await Organization.findOneAndDelete({ _id: req.query.id });

    if(!organization) {
        return next(new ErrorResponse(404, "organization not found"));
    }

    return res.status(200).send({ organization });
});

exports.getAllOrganization = asyncHandler(async (req, res, next) => {

    const matchParams = {};

    const organizations = await Organization.aggregate().match(matchParams);
    
    for(let i = 0; i < organizations.length; i++) {
        await getOrganizationImages( organizations[i] );
    }

    return res.status(200).send({ organizations });
});

exports.getOneOrganization = asyncHandler(async (req, res, next) => {

    const organization = await Organization.findOne({ _id: req.query.id });

    if(!organization) {
        return next(new ErrorResponse(404, "organization not found"));
    }

    await getOrganizationImages( organization );

    return res.status(200).send({ organization });
});