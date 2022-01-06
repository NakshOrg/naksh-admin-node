const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addOrganizationBody,
    updateOrganizationQuery,
    updateOrganizationBody,
    deleteOrganizationQuery,
    getAllOrganizationQuery,
    getOneOrganizationQuery
} = require('../validators/organization');

const {
    addOrganization,
    updateOrganization,
    deleteOrganization,
    getAllOrganization,
    getOneOrganization
} = require('../controllers/organization');

const { auth, restrictAdmin } = require('../middlewares/auth');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addOrganizationBody }), auth, restrictAdmin, addOrganization );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateOrganizationQuery, [Segments.BODY]: updateOrganizationBody }), auth, restrictAdmin, updateOrganization );

router.route('/delete')
.delete( celebrate({ [Segments.QUERY]: deleteOrganizationQuery }), auth, restrictAdmin, deleteOrganization );

router.route('/all')
.get( celebrate({ [Segments.QUERY]: getAllOrganizationQuery }), auth, restrictAdmin, getAllOrganization );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneOrganizationQuery }), auth, restrictAdmin, getOneOrganization );

module.exports = router;