const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    login,
    verifyOtp,
    accountDetails,
    lumaWebScrape
} = require('../controllers/account');

const {
    loginBody,
    verifyOtpBody,
    accountDetailsQuery
} = require('../validators/account');

router.route('/login')
.post( celebrate({ [Segments.BODY]: loginBody }), login );

router.route('/verify')
.post( celebrate({ [Segments.BODY]: verifyOtpBody }), verifyOtp );

router.route('/details')
.get( accountDetails );

router.route('/luma')
.get( lumaWebScrape );

module.exports = router;