const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'data|_adx',
  // password: 'hoangtien14'
});

module.exports = connection;

// mysql://b981b5d5dd160e:8fb03229@us-cdbr-east-05.cleardb.net/heroku_a5d00162d031312?reconnect=true