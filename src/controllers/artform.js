const { asyncHandler } = require('../middlewares/asyncHandler');

const { ErrorResponse } = require('../helpers/error');

const Artform = require('../models/artform');

exports.addArtForm = asyncHandler(async (req, res, next) => {

    let result = [];

    for(let i = 0; i < req.body.artforms; i++) {

        let artform = await Artform.findOne({ name: req.body.artform[i] });
        
        if(artform) {

            result.push({ message: `${req.body.artform[i]} already exists` });

        } else {

            await new Artform({
                ...req.body,
                createdAt: Date.now()
            }).save();

            result.push({ message: `${req.body.artform[i]} was added` });
        }
    }

    return res.status(201).send({ result });
});

exports.updateArtForm = asyncHandler(async (req, res, next) => {

    const artform = await Artform.findOneAndUpdate({ _id: req.query.id }, { ...req.body }, { new: true });

    if(!artform) {
        return next(new ErrorResponse(404, "artform not found"));
    }

    return res.status(200).send({ artform });
});

// Cannot delete artforms under use
exports.deleteArtForm = asyncHandler(async (req, res, next) => {

    const artform = await Artform.findOneAndDelete({ _id: req.query.id });

    if(!artform) {
        return next(new ErrorResponse(404, "artform not found"));
    }

    return res.status(200).send({ artform });
});

exports.getArtform = asyncHandler(async (req, res, next) => {

    const matchParams = {};

    if(req.query.hasOwnProperty('id')) {
        matchParams._id = req.query.id
    }

    const artforms = await getArtform.aggregate().match(matchParams);

    return res.status(200).send({ artforms });
});