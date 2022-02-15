const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'data|_adx',
  // password: 'hoangtien14'
});

module.exports = connection;