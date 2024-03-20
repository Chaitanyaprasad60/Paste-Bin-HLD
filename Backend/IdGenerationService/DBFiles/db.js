const mysql = require('mysql');
const config = require('../config.json');

let host = process.env.host || config.host; 
let user = process.env.user || config.user; 
let password = process.env.password || config.password; 
let database = process.env.database || config.database; 
let dbport = process.env.dbport || config.dbport; 

var pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    port:dbport,
    user: user,
    password: password, 
    database: database
});

pool.getConnection(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

module.exports = pool;