const { error } = require('console');
const inquirer = require('inquirer');
const SQL = require('./sqlCommands')
const sql = new SQL();
class CLI {
    constructor() {
      this.select = '';
     
    }

sqlPrompts() {
    return inquirer
      .prompt([
        {
            type: 'list',
            name: 'select',
            choices:['view Departments','view Roles','view Employees','add Department','add Role','add Employee','update employee role','Quit'],
            message: 'what would you like to do?',
        },
       
    ]
        )
      .then(( { select } ) => {
        this.select = select;
        //console.log(select)
       this.sqlQuery(select)
     
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
    }
     sqlQuery(response) { 
        switch(response) {
            case 'view Departments':
                sql.viewDepartments();
            break;
            case 'view Roles':
                sql.viewRoles();
            break;
            case 'view Employees':
                sql.viewEmployees();
            break;
            case 'add Department':
                sql.addDepartment();
            break;
            case 'add Role':
                sql.addRole();
            break;
            case 'add Employee':
                sql.addEmployee();
            break;
            case 'update employee role':
                sql.updateEmployee();
            break;
            case 'Quit':
                sql.quit();
            break;
        };}


}      

      module.exports = CLI;
      