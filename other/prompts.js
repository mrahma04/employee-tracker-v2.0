// const Department = require('./lib/Department')
const inquirer = require('inquirer')
const fs = require('fs')

const db = require('./db/connection')

const initialQuestions = [{
    type: 'list',
    name: 'task',
    message: 'What would you like to do?',
    choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Done']
}]

const promptUser = () => {
    return inquirer.prompt(initialQuestions)
}

promptUser()
    .then(answers => console.log(answers))
