const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addArtFormBody,
    updateArtFormQuery,
    updateArtFormBody,
    deleteArtFormQuery,
    getOneArtFormQuery
} = require('../validators/artform');

const {
    addArtForm,
    updateArtForm,
    deleteArtForm,
    getAllArtform,
    getOneArtform
} = require('../controllers/artform');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtFormBody }), addArtForm );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtFormQuery, [Segments.BODY]: updateArtFormBody }), updateArtForm );

router.route('/delete')
.delete( celebrate({ [Segments.QUERY]: deleteArtFormQuery }), deleteArtForm );

router.route('/all')
.get( getAllArtform );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneArtFormQuery }), getOneArtform );

module.exports = router;