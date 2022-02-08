const express = require('express');
const router = express.Router();
const adxType = require('./adxType.route')
const adxItem = require('./adxItem.route');
const adxContact =require('./adxContact.route')


const initWebRoute = (app) =>{
    
    router.use('/adxContact', adxContact);
    
    router.use('/adxType', adxType);

    router.use('/adxItem', adxItem);


    return app.use('/', router)
}


module.exports = initWebRoute;