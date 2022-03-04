const mysql = require('mysql2/promise');
const key = require('../../key');
const keys = require('../../key')
// create the connection to database
const connection = mysql.createPool({
  user: keys.dbUser,
  host: 'a4c055ad4e1f',
  database: keys.dbDatabase,
  password: key.dbPassword
});

module.exports = connection;
  // user: 'root',
  // host: 'a4c055ad4e1f',
  // database: 'data_adx',
  // password: 'root',
  // port: '3306'