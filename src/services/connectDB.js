const mysql = require('mysql2/promise');
const key = require('../../key');
const keys = require('../../key')
// create the connection to database
const connection = mysql.createPool({
  user: 'b40f920b43ecea',
  host: 'us-cdbr-east-05.cleardb.net',
  database: 'heroku_d82624da5776a62',
  password: '77fa2bb7'
});
//b40f920b43ecea:77fa2bb7@us-cdbr-east-05.cleardb.net/heroku_d82624da5776a62?reconnect=true
module.exports = connection;
  // user: 'root',
  // host: 'a4c055ad4e1f',
  // database: 'data_adx',
  // password: 'root',
  // port: '3306'