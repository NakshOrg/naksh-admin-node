const { asyncHandler } = require('../middlewares/asyncHandler');

const { Types } = require('mongoose');
const dayjs = require('dayjs');

const { ErrorResponse } = require('../helpers/error');
const { getOrganizationImages, getArtistImages } = require('../helpers/methods');

const Organization = require('../models/organization');
const Artist = require('../models/artist');

exports.addOrganization = asyncHandler(async (req, res, next) => {

    const organization = await new Organization({ ...req.body, createdAt: dayjs().toDate() }).save();

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

exports.deleteOrganization = asyncHandler(async (req, res, next) => {

    const organization = await Organization.findOneAndDelete({ _id: req.query.id });

    if(!organization) {
        return next(new ErrorResponse(404, "organization not found"));
    }

    await Artist.updateMany({ organization: req.query.id }, { $unset: { organization: '' } });

    return res.status(200).send({ organization });
});

exports.getAllOrganization = asyncHandler(async (req, res, next) => {

    const aggregateParams = [];

    const filter = {};

    if(req.query.hasOwnProperty('search')) {
        filter.name = { $regex: req.query.search, $options: 'gi' }
    }

    if(req.query.hasOwnProperty('state')) {
        filter.state = req.query.state
    }

    aggregateParams.push({ $match: filter });

    const $sort = {};

    $sort[req.query.sortBy] = parseInt(req.query.sort);

    aggregateParams.push({ $sort });

    const organizations = await Organization.aggregate(aggregateParams).collation({locale: "en"});
    
    for(let i = 0; i < organizations.length; i++) {
        await getOrganizationImages( organizations[i] );
    }

    return res.status(200).send({ organizations });
});

exports.getOneOrganization = asyncHandler(async (req, res, next) => {

    const aggregateParams = [];

    const organizationMatch = { _id: Types.ObjectId(req.query.id) };

    aggregateParams.push({ $match: organizationMatch });

    const artistLookup = {
        from: "artists",
        localField: "_id",
        foreignField: "organization",
        as: "artists"
    };

    aggregateParams.push({ $lookup: artistLookup });

    const organizations = await Organization.aggregate(aggregateParams).collation({locale: "en"});

    let organization = organizations.length ? organizations[0] : undefined;

    if(!organization) {
        return next(new ErrorResponse(404, "organization not found"));
    }

    await getOrganizationImages( organization );

    for(let i = 0; i < organization.artists.length; i++) {
        await getArtistImages( organization.artists[i] );
    }

    return res.status(200).send({ organization });
});