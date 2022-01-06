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

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addArtFormBody }), auth, restrictAdmin, addArtForm );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateArtFormQuery, [Segments.BODY]: updateArtFormBody }),  auth, restrictAdmin, updateArtForm );

router.route('/delete')
.delete( celebrate({ [Segments.QUERY]: deleteArtFormQuery }), auth, restrictAdmin, deleteArtForm );

router.route('/all')
.get( auth, restrictAdmin, getAllArtform );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneArtFormQuery }), auth, restrictAdmin, getOneArtform );

module.exports = router;