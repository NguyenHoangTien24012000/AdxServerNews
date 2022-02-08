const express = require('express');
const upload = require('../config/configUpFile');
const router = express.Router();
const adxItemController = require('../controller/AdxItemController');

router.get('/getItemGroup/:idGroup', adxItemController.getItemGroup);
router.get('/getItemDetail/:idItem', adxItemController.getItemDetail);
router.post('/updateItemDetail', upload.single('image'), adxItemController.updateItemDetail);


module.exports = router;