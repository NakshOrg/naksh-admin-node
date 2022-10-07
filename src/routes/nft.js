const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    updateTrendingNftQuery,
    updateTrendingNftBody,
    getTrendingNftQuery,
    blockNftQuery,
    blockNftBody
} = require('../validators/nft');

const {
    uploadImageToIPFS,
    updateTrendingNft,
    getTrendingNft,
    blockNft,
    getBlockedNft
} = require('../controllers/nft');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/upload')
.post( auth, restrictAdmin, uploadImageToIPFS );

router.route('/trending')
.patch( celebrate({ [Segments.QUERY]: updateTrendingNftQuery, [Segments.BODY]: updateTrendingNftBody }), updateTrendingNft )
.get( celebrate({ [Segments.QUERY]: getTrendingNftQuery }), getTrendingNft );

router.route('/block')
.patch( auth, restrictAdmin, celebrate({ [Segments.QUERY]: blockNftQuery, [Segments.BODY]: blockNftBody }), blockNft )
.get( getBlockedNft );

module.exports = router;