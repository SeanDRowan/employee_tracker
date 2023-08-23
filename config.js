const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
    
      user: 'root',
      
      password: 'Srbootcamp1',
      database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
  );
  
  module.exports = db;