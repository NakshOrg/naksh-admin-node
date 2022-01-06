const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addArtistBody,
    updateArtistQuery,
    updateArtistBody,
    getAllArtistQuery,
    getOneArtistQuery
} = require('../validators/artist');

const {
    addArtist,
    updateArtist,
    getAllArtist,
    getOneArtist
} = require('../controllers/artist');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtistBody }), auth, restrictAdmin, addArtist );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtistQuery, [Segments.BODY]: updateArtistBody }), auth, restrictAdmin, updateArtist );

router.route('/all')
.get( celebrate({ [Segments.QUERY]: getAllArtistQuery }), auth, restrictAdmin, getAllArtist );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneArtistQuery }), auth, restrictAdmin, getOneArtist );

module.exports = router;