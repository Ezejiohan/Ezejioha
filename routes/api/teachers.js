const express = require('express');
const router = express.Router();
const teachersAdmin = require('../../admins/teachersAdmin');


router.route('/')
    .get(teachersAdmin.getAllTeachers)
    .post(teachersAdmin.createNewTeacher)
    .put(teachersAdmin.updateTeacher)
    .delete(teachersAdmin.deleteTeacher)

router.route('/:id')
    .get(teachersAdmin.getTeacher);

module.exports = router