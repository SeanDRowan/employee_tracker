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
            db.query(` SELECT A.id,
            A.first_name,
            A.last_name,
            role.title AS role,
            department.name AS department,
            role.salary AS salary,
            CONCAT (B.first_name, " ", B.last_name) AS manager
            FROM employee A
            LEFT JOIN role
            ON A.role_id = role.id
            LEFT JOIN department
            ON role.department_id = department.id
            LEFT JOIN employee B
            ON B.id = A.manager_id;`, function (err, results) {
                if(err){console.log(err)}
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
                const Departments = []
                db.query('SELECT * FROM department', (err, rows) => {
                    rows.forEach((department) => { Departments.push(department.name) }
                    
                    );})
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
                        choices:Departments,
                       name:'dept',
                       message:'select department for new role'
                      },
                    ])
                       .then(( { newRole,salary,dept } ) => {
                        this.newRole = newRole;
                        this.salary = salary;
                        this.dept = dept;
                        console.log(dept)

                        let dept_id;
                        db.query('SELECT * FROM department', (err, rows) => {
                        rows.forEach((department) => {
                            if (dept == department.name) {
                                dept_id = department.id;
                                
                            
                        
                        
                        const sql = ` INSERT INTO role (title,salary,department_id) VALUES (?,?,?);`
                        const params = [newRole,salary,dept_id];
                        db.query(sql,params);
                        db.query('SELECT role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
                            console.table(results)
                        })
                    }})})
                        })

             }       
             function addEmployee(){
                const roles = []
                const manager = []
                db.query('SELECT * FROM role', (err, rows) => {
                        rows.forEach((role) => { roles.push(role.title) }
                        );})
                db.query('SELECT CONCAT (employee.first_name, " ", employee.last_name) AS manager FROM employee', (err, rows) => {
                    rows.forEach((employee) => { manager.push(employee.manager) }
                    );})
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
                        type:'list',
                        choices: roles,
                       name:'role_id',
                       message:'select employee role'
                      },
                      {
                        type:'list',
                       name:'manager',
                        choices:manager,
                       message:'select manager'
                      },
                    ])
                       .then(( { firstName, lastName, role_id, manager } ) => {
                        this.firstName = firstName;
                        this.lastName = lastName;
                        this.role_id = role_id;
                        this.manager = manager;
                        console.log(manager)

                        
                        db.query('SELECT * FROM role', (err, rows) => {
                        rows.forEach((role) => {
                            if (role_id == role.title) {
                                role_id = role.id;}
                            console.log(role_id)})
 
                        db.query('SELECT employee.manager_id, CONCAT (employee.first_name, " ", employee.last_name) AS manage_id FROM employee', (err, rows) => {
                        rows.forEach((employee) => {
                            console.log(employee.manager_id)
                            console.log(employee.manage_id)
                            if (manager == employee.manage_id) {
                                manager = employee.manager_id;
                                console.log(manager)
                                
    // this is where work is happening
    
                        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${firstName}","${lastName}","${role_id}","${manager}")`)
                        viewEmployees()
                        }})})
                        })}  )} 



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