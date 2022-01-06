const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');
const { getArtistImages } = require('../helpers/methods');

const Artist = require('../models/artist');

const { Types } = require('mongoose');
const dayjs = require('dayjs');

// ! Wallet data?
exports.addArtist = asyncHandler(async (req, res, next) => {

    const artist = await new Artist({ ...req.body, status: 0, createdAt: dayjs().toDate() }).save();

    await getArtistImages( artist );

    return res.status(201).send({ artist });
});

exports.updateArtist = asyncHandler(async (req, res, next) => {

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

    if(req.query.hasOwnProperty('state')) {
        filter.state = req.query.state;
    }

    if(req.query.hasOwnProperty('status')) {
        filter.status = parseInt(req.query.status);
    }

    if(req.query.hasOwnProperty('artform')) {
        filter.artform = Types.ObjectId(req.query.artform);
    }

    aggregateParams.push({ $match: filter });

    const $sort = {};

    $sort[req.query.sortBy] = parseInt(req.query.sort);

    aggregateParams.push({ $sort });

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