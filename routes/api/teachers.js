const express = require('express');
const router = express.Router();
const teachersAdmin = require('../../admins/teachersAdmin');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles.js');



router.route('/')
    .get(teachersAdmin.getAllTeachers)
    .post(verifyRoles(ROLES_LIST.isAdmin, ROLES_LIST.isTeachers),teachersAdmin.createNewTeacher)
    .put(verifyRoles(ROLES_LIST.isAdmin, ROLES_LIST.isTeachers),teachersAdmin.updateTeacher)
    .delete(verifyRoles(ROLES_LIST.isAdmin),teachersAdmin.deleteTeacher)

router.route('/:id')
    .get(teachersAdmin.getTeacher)
router.route('/:id/:studentid')
    .put(teachersAdmin.updateTeacher)
router.route('/:id')
    .post(teachersAdmin.createNewTeacher)


module.exports = router