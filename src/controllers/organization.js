const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const Organization = require('../models/organization');

// Add custom fields
exports.addOrganization = asyncHandler(async (req, res, next) => {

    const organization = await new Organization(req.body).save();

    return res.status(201).send({ organization });
});

exports.updateOrganization = asyncHandler(async (req, res, next) => {

    const organization = await Organization.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true });

    if(!organization) {
        return next(new ErrorResponse(404, "organization not found"));
    }

    return res.status(200).send({ organization });
});

// What happens to artists under deleted organization?
exports.deleteOrganization = asyncHandler(async (req, res, next) => {

    const organization = await Organization.findOneAndDelete({ _id: req.query.id });

    if(!organization) {
        return next(new ErrorResponse(404, "organization not found"));
    }

    return res.status(200).send({ organization });
});

exports.getOrganization = asyncHandler(async (req, res, next) => {

    const matchParams = {};

    if(req.query.hasOwnProperty('id')) {
        matchParams._id = req.query.id
    }

    const organizations = await Organization.aggregate().match(matchParams);

    return res.status(200).send({ organizations });
});