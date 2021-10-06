const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const { accountDetails, connectWallet, testPinata } = require('../controllers/account');

const {
    connectWalletQuery,
    accountDetailsQuery
} = require('../validators/account');

router.route('/test')
.get( celebrate({ [Segments.QUERY]: connectWalletQuery }), connectWallet );

router.route('/details')
.get( celebrate({ [Segments.QUERY]: accountDetailsQuery }), accountDetails );

router.route('/pinata')
.get( testPinata );

module.exports = router;