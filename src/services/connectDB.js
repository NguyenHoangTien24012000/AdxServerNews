const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b6db61ab5f5cf6',
  database: 'heroku_e1f1835a99e4751',
  password: 'd0769e5a'
});

module.exports = connection;

// mysql://b6db61ab5f5cf6:d0769e5a@us-cdbr-east-05.cleardb.net/heroku_e1f1835a99e4751?reconnect=true