const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: '172.25.0.2',
  user: 'root',
  database: 'data_adx',
  password: 'root'
});

module.exports = connection;