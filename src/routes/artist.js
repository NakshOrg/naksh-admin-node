const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addArtistBody,
    updateArtistQuery,
    updateArtistBody,
    deactivateArtistQuery,
    getOneArtistQuery
} = require('../validators/artist');

const {
    addArtist,
    updateArtist,
    deactivateArtist,
    getAllArtist,
    getOneArtist
} = require('../controllers/artist');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtistBody }), addArtist );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtistQuery, [Segments.BODY]: updateArtistBody }), updateArtist );

router.route('/all')
.get( getAllArtist );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneArtistQuery }), getOneArtist );

module.exports = router;