const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    login,
    verifyOtp,
    accountDetails,
    lumaWebScrape,
    subscribeToTPGNewsletter,
    loginTPG,
    getAllTPGNewsletterSubscribers,
    sendTPGFeedback
} = require('../controllers/account');

const {
    loginBody,
    verifyOtpBody,
    accountDetailsQuery,
    subscribeToTPGNewsletterBody,
    sendTPGFeedbackQuery,
    sendTPGFeedbackBody
} = require('../validators/account');

router.route('/login')
.post( celebrate({ [Segments.BODY]: loginBody }), login );

router.route('/verify')
.post( celebrate({ [Segments.BODY]: verifyOtpBody }), verifyOtp );

router.route('/details')
.get( accountDetails );

router.route('/luma')
.get( lumaWebScrape );

router.route('/subscribeToTPGNewsletter')
.post( celebrate({ [Segments.BODY]: subscribeToTPGNewsletterBody }), subscribeToTPGNewsletter );

router.route('/loginTPG')
.get( loginTPG );

router.route('/getAllTPGNewsletterSubscribers/:otp')
.get( getAllTPGNewsletterSubscribers );

router.route('/sendTPGFeedback')
.post( celebrate({ [Segments.QUERY]: sendTPGFeedbackQuery, [Segments.BODY]: sendTPGFeedbackBody }), sendTPGFeedback );

module.exports = router;