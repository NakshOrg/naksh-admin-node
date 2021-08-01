const express = require('express');
const router = new express.Router;

const { celebrate, Segments } = require('celebrate');

const { accountDetails } = require('../controllers/account');

const { accountDetailsQuery } = require('../validators/account');

router.route('/details')
.get( celebrate({ [Segments.QUERY]: accountDetailsQuery }), accountDetails );

module.exports = router;