const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addCollectionBody,
    updateCollectionQuery,
    updateCollectionBody,
    getAllCollectionQuery,
    getOneCollectionQuery,
    addNftToCollectionQuery,
    addNftToCollectionBody,
    addActivityToCollectionQuery,
    addActivityToCollectionBody
} = require('../validators/collection');

const {
    addCollection,
    updateCollection,
    getAllCollection,
    getOneCollection,
    addNftToCollection,
    addActivityToCollection
} = require('../controllers/collection');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addCollectionBody }),
// auth,
// restrictAdmin,
addCollection );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateCollectionQuery, [Segments.BODY]: updateCollectionBody }),
//  auth,
// restrictAdmin,
updateCollection );

router.route('/all')
.get( celebrate({ [Segments.QUERY]: getAllCollectionQuery }), getAllCollection );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneCollectionQuery }), getOneCollection );

router.route('/nft')
.patch( celebrate({ [Segments.QUERY]: addNftToCollectionQuery, [Segments.BODY]: addNftToCollectionBody }), addNftToCollection )

router.route('/activity')
.patch( celebrate({ [Segments.QUERY]: addActivityToCollectionQuery, [Segments.BODY]: addActivityToCollectionBody }), addActivityToCollection );

module.exports = router;