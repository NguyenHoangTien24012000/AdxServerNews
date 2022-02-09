const express = require('express');

const router = express.Router();
const userController = require('../controller/UserAdminController');

router.post('/changeUser', userController.changeUser);



module.exports = router;