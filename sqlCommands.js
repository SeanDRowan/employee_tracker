
const inquirer = require('inquirer');
const db =require('./config')
//functions to call sql Queries
class SQL {
    constructor() {
      this.select = '';
    }
        viewDepartments(){
          db.query('SELECT id,name FROM department', function (err, results) {
                console.table(results)
                restart()
            })
        };
         viewEmployees(){
            db.query(` SELECT A.id, A.first_name, A.last_name, role.title AS role, department.name AS department, role.salary AS salary, CONCAT (B.first_name, " ", B.last_name) AS manager FROM employee A
            LEFT JOIN role ON A.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee B ON B.id = A.manager_id;`, function (err, results) {
                if(err){console.log(err)}
                  console.table(results)
                  restart()
              })
          };
           viewRoles(){
            db.query( 'SELECT role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;' , function (err, results) {
                  console.table(results)
                 restart()
              })
          };
            addDepartment(){
           return inquirer.prompt ([
                {
                    type:'input',
                    name:'newDpt',
                    message:'enter department name'
                   },])
                   //take newDpt and insert into department table, then call viewDepartments
                   .then(( { newDpt } ) => {
                    this.newDpt = newDpt;
                    const sql = `INSERT INTO department (name) VALUES (?)`
                    const params = newDpt;
                    db.query(sql,params)
                  this.viewDepartments()
                    })} 
                addRole (){
                    //get array of current departments from database, enter into inquirer prompts
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
                      // get department id attached to user selected name and add dept_id,salary,and newRole to table, then show roles
                        let dept_id;
                        db.query('SELECT * FROM department', (err, rows) => {
                        rows.forEach((department) => {
                            if (dept == department.name) {
                                dept_id = department.id;
                        const sql = ` INSERT INTO role (title,salary,department_id) VALUES (?,?,?);`
                        const params = [newRole,salary,dept_id];
                        db.query(sql,params);
                        this.viewRoles()  }})})})}  

              addEmployee(){
                const roles = []
                const manager = []
               // push current roles and employees to arrays for inquirer selection
                db.query('SELECT * FROM role', (err, rows) => {
                        rows.forEach((role) => { roles.push(role.title) }
                        )})
                        //
                db.query('SELECT CONCAT (employee.first_name, " ", employee.last_name) AS manager FROM employee', (err, rows) => {
                    rows.forEach((employee) => { manager.push(employee.manager) }
                    )})
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
                        type:'checkbox',
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
                        var manager_id = 0;
                     // get role_id and employee ids attached to user selected roles and employees
                        db.query('SELECT * FROM role', (err, rows) => {
                        rows.forEach((role) => {
                            if (role_id == role.title) {
                                role_id = role.id;}
                          })})
                        db.query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS manage_id FROM employee', (err, rows) => {
                        rows.forEach((employee) => {
                            if (manager == employee.manage_id) {
                                manager_id = employee.id;}})
                           //insert firstname,last,name,role id, and manager id into employee table, then call viewEmployees     
                             const sql =  `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)` 
                            const params =[firstName,lastName,role_id,manager_id]
                           db.query(sql,params)
                        this.viewEmployees()
                            })
                        })}  
                         
                         updateEmployee(){
                            const roles = []
                            const employeeUd = []
                             // get role_id and employee ids attached to user selected roles and employees
                            db.query('SELECT * FROM role', (err, rows) => {
                                rows.forEach((role) => { roles.push(role.title) }
                                )})
                                db.query('SELECT CONCAT (employee.first_name, " ", employee.last_name) AS employeeUd FROM employee', (err, rows) => {
                                    rows.forEach((employee) => { employeeUd.push(employee.employeeUd) })})
                            return inquirer.prompt ([
                                {
                                    name:'update employee'
                                },
                                {
                                    type:'list',
                                    name:'employees',
                                    choices: employeeUd,
                                    message:'select employee to update'
                                   },
                                 {
                                     type:'list',
                                     name:'role_id',
                                     choices:roles,
                                     message:'select employees new role'
                                    },
                                ])
                                    .then(( { employees,role_id } ) => {
                                     this.employees = employees;
                                     this.role_id = role_id;
                                     // get role_id and employee ids attached to user selected roles and employees
                                     db.query('SELECT * FROM role', (err, rows) => {
                                        rows.forEach((role) => {
                                            if (role_id == role.title) {
                                                role_id = role.id;}})})
                                                  console.log(employees)
                                            db.query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS employee_id FROM employee', (err, rows) => {
                                                rows.forEach((employee) => {
                                                    console.log(employee.employee_id)
                                                    if (employees == employee.employee_id) {
                                                        employees = employee.id;
                                                        }})
                                             // update chosen employee role, then call view employees           
                                                        const sql = `UPDATE employee SET role_id = ? WHERE employee.id = ?`
                                                        const params= [role_id,employees]
                                     db.query(sql,params)
                                     this.viewEmployees()
                                    })
                                         
                                         })}

                                          quit(){db.end()}
                                     
                                     
        
    
}
function restart(){
    CLI = require('./cli');
    cli = new CLI();
    cli.sqlPrompts();
}

     
     module.exports = SQL;