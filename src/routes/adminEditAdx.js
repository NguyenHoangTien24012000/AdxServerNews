const express = require('express');
const router = express.Router();
const adxType = require('./adxType.route')
const adxItem = require('./adxItem.route');


const adminRoute = (app) =>{
  
    
    router.use('/admin/adxType', adxType);

    router.use('/admin/adxItem', adxItem);


    return app.use('/', router)
}


module.exports = adminRoute;