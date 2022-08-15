const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    updateTrendingNftQuery,
    updateTrendingNftBody,
    getTrendingNftQuery
} = require('../validators/nft');

const {
    uploadImageToIPFS,
    updateTrendingNft,
    getTrendingNft
} = require('../controllers/nft');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/upload')
.post( auth, restrictAdmin, uploadImageToIPFS );

router.route('/trending')
.patch( celebrate({ [Segments.QUERY]: updateTrendingNftQuery, [Segments.BODY]: updateTrendingNftBody }), updateTrendingNft );

router.route('/trending')
.get( celebrate({ [Segments.QUERY]: getTrendingNftQuery }), getTrendingNft );

module.exports = router;