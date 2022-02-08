const express = require('express');
const router = express.Router();
const userAdminController = require('../controller/UserAdminController')

router.post('/checkLogin', userAdminController.checkLogin)

module.exports = router;

