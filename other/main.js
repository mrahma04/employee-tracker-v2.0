const inquirer = require('inquirer')
const db = require('../db/connection')

// Display department table
const displayDepartment = () => {
    db.promise().query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.table(rows)
        })
        .then(() => continuePrompt())
}

// Display role table
const displayRole = () => {
    db.promise().query(`SELECT * FROM role`)
        .then(([rows]) => {
            console.table(rows)
        })
}

// Display employee table
const displayEmployee = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id AS manager
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;`

    db.promise().query(sql)
        .then(([rows]) => {
            console.table(rows)
        })
}

// Add a department
const addDepartment = (name) => {
    const sql = `INSERT INTO department (name)
                    VALUES(?)`
    const params = [name]
    db.promise().query(sql, params, (err, result) => {
        if (err) throw err
        // console.log(`${name} department added successfully!`)
    }).then(() => console.log(`${name} department added successfully!`))
}

// Add a role
const addRole = (name, salary, departmentId) => {
    const sql = `INSERT INTO role (title, salary, department_id)
                    VALUE(?, ?, ?)`
    const params = [name, salary, departmentId]
    db.promise().query(sql, params, (err, result) => {
        if (err) throw err
        // console.log(`${name} role added succesfully!`)
    }).then(() => console.log(`${name} role added succesfully!`))
}

// Add an employee
const addEmployee = (firstName, lastName, roleId, managerId) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`
    const params = [firstName, lastName, roleId, managerId]
    db.promise().query(sql, params, (err, result) => {
        if (err) throw err
        // console.log(`${firstName} ${lastName} added successfully!`)
    }).then(() => console.log(`${firstName} ${lastName} added successfully!`))
}

// Update an employee role
const updateEmployeeRole = (employeeId, roleId) => {
    const sql = `UPDATE employee
                    SET role_id = ?
                    WHERE id = ?`
    const params = [roleId, employeeId]
    db.promise().query(sql, params, (err, result) => {
        if (err) throw err
        // console.log(`${employeeId}'s role updated successfully!`)
    }).then(() => console.log(`${employeeId}'s role updated successfully!`))
}

const continuePromptQuestions = [
    {
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to continue?',
        default: false
    }
]

const continuePrompt = () => {
    inquirer.prompt(continuePromptQuestions).then((answers) => {
        if (answers.continue) {
            initialPrompt()
        }
    })
}

// Create initial prompt
const initialPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Done']
        }
    ]).then(answers => {
        if (answers.task === 'View all Departments') {
            displayDepartment()
        }
        if (answers.task === 'View all Roles') {
            displayRole()
        }
        if (answers.task === 'View all Employees') {
            displayEmployee()
        }
        if (answers.task === 'Add a Department') {
            // addDepartment('Department of Transportation')
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter Department name:'
                }
            ])
                .then(answers => addDepartment(answers.name))
                .then(() => displayDepartment())
        }
        if (answers.task === 'Add a Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter Role name:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter Salary:'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter Role ID:'
                }
            ])
                .then(answers => addRole(answers.name, answers.salary, answers.roleId))
                .then(() => displayRole())
        }
        if (answers.task === 'Add an Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter Employee First Name:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter Employee Last Name:'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter Role ID:'
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter Manager ID (leave blank if none):'
                }
            ])
                .then(answers => {
                    let managerId
                    if (answers.managerId === '') {
                        managerId === null
                    }
                    addEmployee(answers.firstName, answers.lastName, answers.roleId, managerId)
                })
                .then(() => displayEmployee())
        }
        if (answers.task === 'Update an Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter Employee ID:'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter new Role Id:'
                }
            ])
                .then(answers => updateEmployeeRole(answers.employeeId, answers.roleId))
                .then(() => displayEmployee())
        }
    })
}

initialPrompt()
    // .then(() => displayDepartment())