const express = require('express');
const router = express.Router();
const registerAdmin = require('../admins/registerAdmins')

router.post('/', registerAdmin.handlerNewUser);

module.exports = router;