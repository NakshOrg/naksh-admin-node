const express = require('express');
const router = new express.Router;

const { connectWallet } = require('../controllers/wallet');

router.route('/').get( connectWallet );

module.exports = router;