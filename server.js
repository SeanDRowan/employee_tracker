const { error } = require('console');
const mysql = require('mysql2');
const express = require('express');
const app = express();
//const sql = require('./sqlCommands')

const CLI = require('./cli');

const cli = new CLI();

cli.sqlPrompts();


/*
const db = mysql.createConnection(
    {
      host: 'localhost',
    
      user: 'root',
      
      password: 'Srbootcamp1',
      database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
  );

    //const params =
  db.query(sql, (err, results) => {
    if(err){return error}
   
    console.log(results);
  });*/



