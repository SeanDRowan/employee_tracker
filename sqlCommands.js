//const db =require('./server')
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
    
      user: 'root',
      
      password: 'Srbootcamp1',
      database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
  );

function sqlQuery(response) { 
        switch(response) {
            case 'view Departments':
                viewDepartments();
            break;
            case 'view Roles':
                viewRoles();
            break;
            case 'view Employees':
                viewEmployees();
            break;
            case 'add Department':
                addDepartment();
            break;
            
        };}
    
        function viewDepartments(){
          db.query('SELECT * FROM department', function (err, results) {
                console.table(results)
                restart()

            })
        };
        function viewEmployees(){
            db.query('SELECT * FROM employee', function (err, results) {
                  console.table(results)
                  restart()
              })
          };
          function viewRoles(){
            db.query('SELECT * FROM role', function (err, results) {
                  console.table(results)
                 restart()
              })
          };
           function addDepartment(){
           return inquirer.prompt ([
                {
                    type:'input',
                    name:'newDpt',
                    message:'enter department name'
                   },])
                   .then(( { newDpt } ) => {
                    this.newDpt = newDpt;
                    db.query(`INSERT INTO department (name) VALUES ("${newDpt}")`)
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results)
                        restart()})

                    console.log(newDpt)})
           }  
       function restart(){
                  CLI = require('./cli');
                  cli = new CLI();
                  cli.sqlPrompts();
       }
    

     module.exports = { sqlQuery };