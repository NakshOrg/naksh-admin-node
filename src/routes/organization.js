const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addOrganizationBody,
    updateOrganizationQuery,
    updateOrganizationBody,
    deleteOrganizationQuery,
    getOneOrganizationQuery
} = require('../validators/organization');

const {
    addOrganization,
    updateOrganization,
    deleteOrganization,
    getAllOrganization,
    getOneOrganization
} = require('../controllers/organization');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addOrganizationBody }), addOrganization );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateOrganizationQuery, [Segments.BODY]: updateOrganizationBody }), updateOrganization );

router.route('/delete')
.delete( celebrate({ [Segments.QUERY]: deleteOrganizationQuery }), deleteOrganization );

router.route('/all')
.get( getAllOrganization );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: getOneOrganizationQuery }), getOneOrganization );

module.exports = router;