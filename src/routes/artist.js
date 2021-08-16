const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addArtistBody,
    updateArtistQuery,
    updateArtistBody,
    deleteArtistQuery,
    getOneArtistQuery
} = require('../validators/artist');

const {
    addArtist,
    updateArtist,
    deleteArtist,
    getAllArtist,
    getOneArtist
} = require('../controllers/artist');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtistBody }), addArtist );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtistQuery, [Segments.BODY]: updateArtistBody }), updateArtist );

router.route('/delete')
.delete( celebrate({ [Segments.QUERY]: deleteArtistQuery }), deleteArtist );

router.route('/all')
.get( getAllArtist );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneArtistQuery }), getOneArtist );

module.exports = router;