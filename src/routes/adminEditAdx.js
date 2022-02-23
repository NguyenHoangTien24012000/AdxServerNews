const express = require('express');
const router = express.Router();
const adxType = require('./adxType.route')
const adxItem = require('./adxItem.route')
const user = require('./user.route')



const adminRoute = (app) =>{
  
    
    router.use('/admin/adxType', adxType);

    router.use('/admin/adxItem', adxItem);

    router.use('/admin/user', user)

    return app.use('/', router)
}


module.exports = adminRoute;