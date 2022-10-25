const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');
const { getArtistImages } = require('../helpers/methods');

const Artist = require('../models/artist');

const { Types } = require('mongoose');
const dayjs = require('dayjs');
const { ethers } = require("ethers");

exports.addArtist = asyncHandler(async (req, res, next) => {

    if(req.body.hasOwnProperty('wallet')) {
        const exist = await Artist.findOne({ wallet: req.body.wallet });
        if(exist) {
            return next(new ErrorResponse(404, "wallet already associated with another artist"));
        }
    }

    if( !req.body.wallet.match(/^.+\.(near|testnet)$/) && !ethers.utils.isAddress(req.body.wallet) ) {
        return next(new ErrorResponse(400, "Invalid wallet address"));
    }

    const artist = await new Artist({ ...req.body, status: 0, createdAt: dayjs().toDate() }).save();

    await getArtistImages( artist );

    return res.status(201).send({ artist });
});

exports.updateArtist = asyncHandler(async (req, res, next) => {

    if(req.body.hasOwnProperty('wallet')) {
        const exist = await Artist.findOne({ _id: { $ne: req.query.id }, wallet: req.body.wallet });
        if(exist) {
            return next(new ErrorResponse(404, "wallet already associated with another artist"));
        }
    }

    const artist = await Artist.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true });

    if(!artist) {
        return next(new ErrorResponse(404, "artist not found"));
    }

    await getArtistImages( artist );

    return res.status(200).send({ artist });
});

exports.getAllArtist = asyncHandler(async (req, res, next) => {

    const aggregateParams = [];

    const filter = {};

    if(req.query.hasOwnProperty('search')) {
        filter.name = { $regex: req.query.search, $options: 'gi' };
    }

    if(req.query.hasOwnProperty('wallet')) {
        filter.wallet = { $regex: `^${req.query.wallet}$`, $options: 'gi' };
    }

    if(req.query.hasOwnProperty('id')) {
        filter._id = Types.ObjectId(req.query.id);
    }

    if(req.query.hasOwnProperty('state')) {
        filter.state = req.query.state;
    }

    if(req.query.hasOwnProperty('status')) {
        filter.status = parseInt(req.query.status);
    }

    if(req.query.hasOwnProperty('artform')) {
        filter.artform = Types.ObjectId(req.query.artform);
    }

    if(req.query.hasOwnProperty('createdBy')) {
        filter.createdBy = parseInt(req.query.createdBy);
    }

    if(req.query.hasOwnProperty('creatorStatus')) {
        filter.creatorStatus = parseInt(req.query.creatorStatus);
    }

    if(req.query.sortBy == "trending") {
        filter.trending = { $gt: 0 };
    }

    aggregateParams.push({ $match: filter });

    const $sort = {};

    $sort[req.query.sortBy] = parseInt(req.query.sort);

    aggregateParams.push({ $sort });

    const artformLookup = {
        from: "artforms",
        localField: "artform",
        foreignField: "_id",
        as: "artform"
    };

    aggregateParams.push({ $lookup: artformLookup });

    let artformUnwind = {
        path: "$artform",
        preserveNullAndEmptyArrays: true
    };

    aggregateParams.push({ $unwind: artformUnwind });

    const artists = await Artist.aggregate(aggregateParams).collation({locale: "en"});
    
    for(let i = 0; i < artists.length; i++) {
        await getArtistImages( artists[i] );
    }

    return res.status(200).send({ artists });
});

exports.getOneArtist = asyncHandler(async (req, res, next) => {

    const artformPopulate = {
        path: "artform",
        model: "Artform"
    };

    const organizationPopulate = {
        path: "organization",
        model: "Organization"
    };

    const artist = await Artist.findOne({ _id: req.query.id }).populate(artformPopulate).populate(organizationPopulate);

    if(!artist) {
        return next(new ErrorResponse(404, "artist not found"));
    }

    await getArtistImages( artist );

    return res.status(200).send({ artist });
});

exports.getNftArtists = asyncHandler(async (req, res, next) => {

    const artformPopulate = {
        path: "artform",
        model: "Artform"
    };

    const organizationPopulate = {
        path: "organization",
        model: "Organization"
    };

    const [ artist, owner ] = await Promise.all([
        Artist.findOne({ wallet: req.query.artist }).populate(artformPopulate).populate(organizationPopulate),
        Artist.findOne({ wallet: req.query.owner }).populate(artformPopulate).populate(organizationPopulate)
    ]);

    if(artist) {
        await getArtistImages( artist );
    }

    if(owner) {
        await getArtistImages( owner );
    }

    return res.status(200).send({ artist, owner });
});