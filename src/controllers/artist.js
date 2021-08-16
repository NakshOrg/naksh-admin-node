const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');
const { getArtistImages } = require('../helpers/methods');

const Artist = require('../models/artist');

// ! Wallet data?
exports.addArtist = asyncHandler(async (req, res, next) => {

    const artist = await new Artist(req.body).save();

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

// !Verify delete business logic
exports.deleteArtist = asyncHandler(async (req, res, next) => {

    const artist = await Artist.findOneAndDelete({ _id: req.query.id });

    if(!artist) {
        return next(new ErrorResponse(404, "artist not found"));
    }

    return res.status(200).send({ artist });
});

exports.getAllArtist = asyncHandler(async (req, res, next) => {

    const matchParams = {};

    const artists = await Artist.aggregate().match(matchParams);
    
    for(let i = 0; i < artists.length; i++) {
        await getArtistImages( artists[i] );
    }

    return res.status(200).send({ artists });
});

exports.getOneArtist = asyncHandler(async (req, res, next) => {

    const artist = await Artist.findOne({ _id: req.query.id });

    if(!artist) {
        return next(new ErrorResponse(404, "artist not found"));
    }

    await getArtistImages( artist );

    return res.status(200).send({ artist });
});