const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addArtistBody,
    updateArtistQuery,
    updateArtistBody,
    getAllArtistQuery,
    getOneArtistQuery,
    getNftArtistsQuery,
    saveNftQuery,
    saveNftBody,
    unsaveNftQuery,
    unsaveNftBody
} = require('../validators/artist');

const {
    addArtist,
    updateArtist,
    getAllArtist,
    getOneArtist,
    getNftArtists,
    saveNft,
    unsaveNft
} = require('../controllers/artist');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtistBody }),
// auth,
// restrictAdmin,
addArtist );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtistQuery, [Segments.BODY]: updateArtistBody }),
//  auth,
// restrictAdmin,
updateArtist );

router.route('/all')
.get( celebrate({ [Segments.QUERY]: getAllArtistQuery }), getAllArtist );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneArtistQuery }), getOneArtist );

router.route('/nft')
.get( celebrate({ [Segments.QUERY]: getNftArtistsQuery }), getNftArtists );

router.route('/saveNft')
.patch( celebrate({ [Segments.BODY]: saveNftBody }), saveNft )

router.route('/unsaveNft')
.patch( celebrate({ [Segments.BODY]: unsaveNftBody }), unsaveNft );

module.exports = router;