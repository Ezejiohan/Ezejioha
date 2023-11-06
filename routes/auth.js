const express = require('express');
const router = express.Router();
const authAdmin = require('../admins/authAdmin')

router.post('/', authAdmin.handleLogin);

module.exports = router;