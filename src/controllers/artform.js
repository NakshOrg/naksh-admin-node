const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const Artform = require('../models/artform');
const Artist = require('../models/artist');

exports.addArtForm = asyncHandler(async (req, res, next) => {

    let result = [];

    for(let i = 0; i < req.body.artforms.length; i++) {

        let artform = await Artform.findOne({ name: { $regex: req.body.artforms[i], $options: "i" } });
        
        if(artform) {

            result.push( { error: `${req.body.artforms[i]} already exists`} );

        } else {

            await new Artform({
                name: req.body.artforms[i],
                createdAt: Date.now()
            }).save();

            result.push( { success: `${req.body.artforms[i]} was added`} );
        }
    }

    return res.status(201).send({ result });
});

exports.updateArtForm = asyncHandler(async (req, res, next) => {

    const exist = await Artform.findOne({ name: { $regex: req.body.name, $options: "i" } });
        
    if(exist) {
        return next(new ErrorResponse(400, `${req.body.name} already exists`));
    }

    const artform = await Artform.findOneAndUpdate({ _id: req.query.id }, { ...req.body }, { new: true });

    if(!artform) {
        return next(new ErrorResponse(404, "artform not found"));
    }

    return res.status(200).send({ artform });
});

exports.deleteArtForm = asyncHandler(async (req, res, next) => {

    const exist = await Artist.findOne({ artform: req.query.id });

    if(exist) {
        return next(new ErrorResponse(400, "artform is associated with an artist"));
    }

    const artform = await Artform.findOneAndDelete({ _id: req.query.id });

    if(!artform) {
        return next(new ErrorResponse(404, "artform not found"));
    }

    return res.status(200).send({ artform });
});

exports.getAllArtform = asyncHandler(async (req, res, next) => {

    const aggregateParams = [];

    const artformMatch = {};

    aggregateParams.push({ $match: artformMatch });

    const artistLookup = {
        from: "artists",
        localField: "_id",
        foreignField: "artform",
        as: "totalArtists"
    };

    aggregateParams.push({ $lookup: artistLookup });

    const replaceArtist = {
        totalArtists: { $size: "$totalArtists" }
    };

    aggregateParams.push({ $addFields: replaceArtist });

    const artforms = await Artform.aggregate(aggregateParams).collation({locale: "en"});

    return res.status(200).send({ artforms });
});

exports.getOneArtform = asyncHandler(async (req, res, next) => {

    const artform = await Artform.findOne({ _id: req.query.id });

    if(!artform) {
        return next(new ErrorResponse(404, "artform not found"));
    }
    
    return res.status(200).send({ artform });
});