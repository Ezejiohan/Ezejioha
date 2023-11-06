const express = require('express');
const router = express.Router();
const refreshTokenAdmin = require('../admins/refreshTokenAdmin')

router.get('/', refreshTokenAdmin.handleRefreshToken);

module.exports = router;