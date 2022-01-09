const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    uploadImageToIPFS
} = require('../controllers/nft');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/upload')
.post( auth, restrictAdmin, uploadImageToIPFS );

module.exports = router;