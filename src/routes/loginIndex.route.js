const express = require('express');
const router = express.Router();
const routerLogin = require('./loginAdmin.route')
// const {make, check} = require('../')
const loginInitWeb = (app) =>{
    router.use('/admin', routerLogin);
    return app.use('/', router);
}

module.exports = loginInitWeb;