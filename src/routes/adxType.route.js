const express = require('express');
const router = express.Router();
const adxTypeController = require('../controller/AdxTypeController')
const upload = require('../config/configUpFile');

router.get('/getAllAdxType', adxTypeController.getAllAdxType)
router.get('/getAdxType/:id_adx', adxTypeController.getAdxType)
// router.post('/createAdxType', adxTypeController.createAdxType)
router.get('/getAdxGroupType/:groupType', adxTypeController.getGroupAdxType)
router.get('/getAllAdxGroupType', adxTypeController.getAllGroupAdxType)
router.post("/updateAdxType", upload.single('image'), adxTypeController.updateAdxType)
router.post("/addNewAdxType", upload.single('image'), adxTypeController.addAdxType)
router.post("/deleteAdxType/:id_adx", adxTypeController.deleteAdxType)
module.exports = router;