const router = require('express').Router();

const { celebrate, Segments } = require('celebrate');

const {
    addOrganizationBody,
    updateOrganizationQuery,
    updateOrganizationBody,
    deleteOrganizationQuery,
    geteOrganizationQuery
} = require('../validators/organization');

const {
    addOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganization
} = require('../controllers/organization');

router.route('/add')
.post( celebrate({ [Segments.BODY]: addOrganizationBody }), addOrganization );

router.route('/update')
.patch( celebrate({ [Segments.QUERY]: updateOrganizationQuery, [Segments.BODY]: updateOrganizationBody }), updateOrganization );

router.route('/delete')
.delete( celebrate({ [Segments.QUERY]: deleteOrganizationQuery }), deleteOrganization );

router.route('/get')
.get( celebrate({ [Segments.QUERY]: geteOrganizationQuery }), getOrganization );

module.exports = router;