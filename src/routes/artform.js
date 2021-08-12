const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addArtFormBody,
    updateArtFormQuery,
    updateArtFormBody,
    deleteArtFormQuery,
    getArtFormQuery
} = require('../validators/artform');

const {
    addArtForm,
    updateArtForm,
    deleteArtForm,
    getArtform
} = require('../controllers/artform');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtFormBody }), addArtForm );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtFormQuery, [Segments.BODY]: updateArtFormBody }), updateArtForm );

router.route('/delete')
.delete( celebrate({ [Segments.QUERY]: deleteArtFormQuery }), deleteArtForm );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getArtFormQuery }), getArtform );

module.exports = router;