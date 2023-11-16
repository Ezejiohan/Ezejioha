const express = require('express');
const router = express.Router();
const studentsTeacher = require('../../teachers/studentsTeacher');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');




router.route('/')
    .get(studentsTeacher.getAllStudent)
    .post(verifyRoles(ROLES_LIST.isTeachers),studentsTeacher.createNewStudent)
    .put(verifyRoles(ROLES_LIST.isTeachers),studentsTeacher.updateStudent)
    

router.route('/:id')
    .get(studentsTeacher.getStudent)
    .put(studentsTeacher.updateStudent)
router.route('/:id')
    .post(studentsTeacher.createNewStudent)
    .post(studentsTeacher.getAllStudent)
    

module.exports = router