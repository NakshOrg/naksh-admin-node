const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const { accountDetails, connectWallet } = require('../controllers/account');

const {
    connectWalletQuery,
    accountDetailsQuery
} = require('../validators/account');

router.route('/test')
.get( celebrate({ [Segments.QUERY]: connectWalletQuery }), connectWallet );

router.route('/details')
.get( celebrate({ [Segments.QUERY]: accountDetailsQuery }), accountDetails );

module.exports = router;