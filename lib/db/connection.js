var mysql = require('mysql')

var connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.PASSWORD || 'correct',
  database: process.env.DB_DATABASE || 'couch_safe',
  port: 3306
})

module.exports = { connection }
