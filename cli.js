const { error } = require('console');
const inquirer = require('inquirer');
const { writeFile } = require('fs/promises');
/*
class CLI {
    constructor() {
      this.text = '';
      this.logo = [];
      this.shapeColor = '';
    }*/

sqlPrompts() {
    return inquirer
      .prompt([
        {
            type: 'checkbox',
            name: 'select',
            choices:['view Departments','view Roles','view Employees','add Department','add Role','add Employee','update employee role'],
            message: 'what would you like to do?',
        },
        {
          type: 'input',
          name: 'textColor',
          message: 'enter text color',
        },
        {
          type: 'checkbox',
          name: 'shape',
          choices:['Triangle','Circle','Square'],
          message: 'what shape should the logo be?',
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'enter backround color',
          },
      ])
      .then(( { text,shape,shapeColor,textColor } ) => {
        this.text = text;
        this.textColor = textColor;
        this.shapeColor = shapeColor;
      if(this.text.length > 3){
        throw error('text must not be longer than three characters') 
      }
      this.logo.push({ shape });
    
      })
      .then(() => {
        writeFile( './examples/logo.svg',
        createDocument(this.text, this.logo,this.textColor,this.shapeColor),function (err) {
            if(err){throw err;}
        });  console.log("Generated logo.svg")
})
      .catch((err) => {
        console.log(err);
        console.log('Oops. Something went wrong.');
      });
    }}


      module.exports = CLI;