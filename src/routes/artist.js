const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addArtistBody,
    updateArtistQuery,
    updateArtistBody,
    getAllArtistQuery,
    getOneArtistQuery,
    updateTrendingArtistQuery,
    updateTrendingArtistBody
} = require('../validators/artist');

const {
    addArtist,
    updateArtist,
    getAllArtist,
    getOneArtist,
    updateTrendingArtist,
    getTrendingArtist
} = require('../controllers/artist');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtistBody }), auth, restrictAdmin, addArtist );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtistQuery, [Segments.BODY]: updateArtistBody }), auth, restrictAdmin, updateArtist );

router.route('/all')
.get( celebrate({ [Segments.QUERY]: getAllArtistQuery }), getAllArtist );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneArtistQuery }), getOneArtist );

router.route('/trending')
.patch( celebrate({ [Segments.QUERY]: updateTrendingArtistQuery, [Segments.BODY]: updateTrendingArtistBody }), updateTrendingArtist );

router.route('/trending')
.get( getTrendingArtist );

module.exports = router;