const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: '171.27.0.2',
  user: 'root',
  database: 'sys',
  password: 'root'
});

module.exports = connection;