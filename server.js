const { error } = require('console');
const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const db = mysql.createConnection(
    {
      host: 'localhost',
    
      user: 'root',
      
      password: 'Srbootcamp1',
      database: 'employees_db'
    },
    console.log(`Connected to the _ database.`)
  );
//wrap api around query

app.get('/api/employee',({ body },res) => {
    const sql = 'SELECT * FROM employee';
    //const params =
  db.query(sql, (err, results) => {
    if(err){return error}
    res.json({data: body})
    console.log(results);
  });})

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

