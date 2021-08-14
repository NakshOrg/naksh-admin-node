const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const { s3PutpresignedUrlBody } = require('../validators/file');

const { s3PutpresignedUrl } = require('../controllers/file');

router.route('/upload')
.post( celebrate({ [Segments.BODY]: s3PutpresignedUrlBody }), s3PutpresignedUrl );

module.exports = router;