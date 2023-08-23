const { error } = require('console');
const inquirer = require('inquirer');
const { sqlQuery } = require('./sqlCommands')

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
            choices:['view Departments','view Roles','view Employees','add Department','add Role','add Employee','update employee role'],
            message: 'what would you like to do?',
        },
       
    ]
        )
      .then(( { select } ) => {
        this.select = select;
        //console.log(select)
       sqlQuery(select)
     
      })
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
    }



}      

      module.exports = CLI;
      