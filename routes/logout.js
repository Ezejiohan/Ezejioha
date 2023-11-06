const express = require('express');
const router = express.Router();
const logoutAdmin = require('../admins/logoutAdmin')

router.get('/', logoutAdmin.handleLogout);

module.exports = router;