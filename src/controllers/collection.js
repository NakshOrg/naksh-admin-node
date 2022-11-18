const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');
const { getCollectionImages } = require('../helpers/methods');

const Collection = require('../models/collection');

const dayjs = require('dayjs');

exports.addCollection = asyncHandler(async (req, res, next) => {

    const collection = await new Collection({ ...req.body, status: 0, createdAt: dayjs().toDate() }).save();

    await getCollectionImages( collection );

    return res.status(201).send({ collection });
});

exports.updateCollection = asyncHandler(async (req, res, next) => {

    const collection = await Collection.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true });

    if(!collection) {
        return next(new ErrorResponse(404, "collection not found"));
    }

    await getCollectionImages( collection );

    return res.status(200).send({ collection });
});

exports.getAllCollection = asyncHandler(async (req, res, next) => {

    const aggregateParams = [];

    const filter = {};

    aggregateParams.push({ $match: filter });

    const $sort = {};

    $sort[req.query.sortBy] = parseInt(req.query.sort);

    aggregateParams.push({ $sort });

    const artistLookup = {
        from: "artists",
        localField: "artist",
        foreignField: "_id",
        as: "artist"
    };

    aggregateParams.push({ $lookup: artistLookup });

    let artistUnwind = {
        path: "$artist",
        preserveNullAndEmptyArrays: true
    };

    aggregateParams.push({ $unwind: artistUnwind });

    const collections = await Collection.aggregate(aggregateParams).collation({locale: "en"});
    
    for(let i = 0; i < collections.length; i++) {
        await getCollectionImages( collections[i] );
    }

    return res.status(200).send({ collections });
});

exports.getOneCollection = asyncHandler(async (req, res, next) => {

    const artistPopulate = {
        path: "artist",
        model: "Artist"
    };

    const collection = await Collection.findOne({ _id: req.query.id }).populate(artistPopulate);

    if(!collection) {
        return next(new ErrorResponse(404, "collection not found"));
    }

    await getCollectionImages( collection );

    return res.status(200).send({ collection });
});

exports.addNftToCollection = asyncHandler(async (req, res, next) => {

    const collection = await Collection.findOneAndUpdate({ _id: req.query.id }, { $push: { ...req.body } }, { new: true });

    if(!collection) {
        return next(new ErrorResponse(404, "collection not found"));
    }

    await getCollectionImages( collection );

    return res.status(200).send({ collection });
});

exports.addActivityToCollection = asyncHandler(async (req, res, next) => {

    const collection = await Collection.findOneAndUpdate({ _id: req.query.id }, { $push: { activity: { ...req.body, createdAt: dayjs().toDate() } } }, { new: true });

    if(!collection) {
        return next(new ErrorResponse(404, "collection not found"));
    }

    await getCollectionImages( collection );

    return res.status(200).send({ collection });
});