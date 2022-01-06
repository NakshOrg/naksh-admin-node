const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    login,
    verifyOtp,
    accountDetails,
    connectWallet,
    testPinata
} = require('../controllers/account');

const {
    loginBody,
    verifyOtpBody,
    connectWalletQuery,
    accountDetailsQuery
} = require('../validators/account');

router.route('/login')
.post( celebrate({ [Segments.BODY]: loginBody }), login );

router.route('/verify')
.post( celebrate({ [Segments.BODY]: verifyOtpBody }), verifyOtp );

router.route('/test')
.get( celebrate({ [Segments.QUERY]: connectWalletQuery }), connectWallet );

router.route('/details')
.get( celebrate({ [Segments.QUERY]: accountDetailsQuery }), accountDetails );

router.route('/pinata')
.get( testPinata );

module.exports = router;