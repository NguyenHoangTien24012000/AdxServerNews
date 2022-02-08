const express = require('express');
const upload = require('../config/configUpFile');
const router = express.Router();
const adxContactController = require('../controller/AdxContactController')

router.get('/getAllAdxContact', adxContactController.getAllAdxContact)
router.post('/editAdxContact', upload.single('') ,adxContactController.editAdxContact)

module.exports = router;