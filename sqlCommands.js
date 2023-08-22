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
            case 'add Role':
                addRole();
            break;
            case 'add Employee':
                addEmployee();
            break;
            case 'Update Employee Role':
                updateEmployee();
            break;
           
        };}
    
        function viewDepartments(){
          db.query('SELECT id,name FROM department', function (err, results) {
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
            db.query( 'SELECT role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;' , function (err, results) {
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
                    const sql = `INSERT INTO department (name) VALUES (?)`
                    const params = newDpt;
                    db.query(sql,params)
                    db.query('SELECT * FROM department', function (err, results) {
                        console.table(results)
                        restart()})
                    })} 
             function addRole(){
                return inquirer.prompt ([
                    {
                         type:'input',
                        name:'newRole',
                        message:'enter new role'
                       },
                       {
                        type:'input',
                       name:'salary',
                       message:'enter salary for new role'
                      },
                      {
                        type:'list',
                        choices:["Sales","Development","Management","other"],
                       name:'dept',
                       message:'select department for new role'
                      },
                    ])
                       .then(( { newRole,salary,dept } ) => {
                        this.newRole = newRole;
                        this.salary = salary;
                        this.dept = dept;
                        console.log(dept)
                        switch(dept) {
                            case 'Sales':
                             dept_id = 1;
                            break;case 'Development':
                            dept_id = 2;
                           break;case 'Management':
                           dept_id = 3;
                          break;case 'Other':
                          dept_id = 4;
                         break;}
                        console.log(dept_id)
                        const sql = ` INSERT INTO role (title,salary,department_id) VALUES (?,?,?);`
                        const params = [newRole,salary,dept_id];
                        db.query(sql,params);
                        db.query('SELECT role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
                            console.table(results)
                        })

                    
                        
                        //viewRoles()
                        })

             }       
             function addEmployee(){
                return inquirer.prompt ([
                    {
                         type:'input',
                        name:'firstName',
                        message:'enter employee first name'
                       },
                       {
                        type:'input',
                       name:'lastName',
                       message:'enter employee last name'
                      },
                      {
                        type:'input',
                       name:'role',
                       message:'enter employee role'
                      },
                      {
                        type:'input',
                       name:'manager',
                       message:'enter manager_id'
                      },
                    ])
                       .then(( { firstName, lastName, role, manager } ) => {
                        this.firstName = firstName;
                        this.lastName = lastName;
                        this.role = role;
                        this.manager = manager;
                        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${firstName}","${lastName}","${role}","${manager}")`)
                        db.query('SELECT * FROM employee', function (err, results) {
                            console.table(results)
                            restart()})
                        })}   
                        function updateEmployee(){
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
                                     })}      
       function restart(){
                  CLI = require('./cli');
                  cli = new CLI();
                  cli.sqlPrompts();
       }
    

     module.exports = { sqlQuery };