const inquirer = require('inquirer')

const db = require('./db/connection')

// Create initial prompt
const initialPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Done']
        }
    ]).then(answers => console.log(answers))
}

// Display department table
const displayDepartment = () => {
    db.promise().query(`SELECT * FROM department`)
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
        console.log(`${name} department added successfully!`)
    })
}

// Display role table
const displayRole = () => {
    db.promise().query(`SELECT * FROM role`)
    .then(([rows]) => {
        console.table(rows)
    })
}

// Add a role
const addRole = (name, salary, departmentId) => {
    const sql = `INSERT INTO role (title, salary, department_id)
                    VALUE(?, ?, ?)`
    const params = [name, salary, departmentId]
    db.promise().query(sql, params, (err, result) => {
        if (err) throw err
        console.log(`${name} role added succesfully!`)
    })
}

// Display employee table
const displayEmployee = () => {
    db.promise().query(`SELECT * FROM employee`)
    .then(([rows]) => {
        console.table(rows)
    })
}

// Add an employee
const addEmployee = (firstName, lastName, roleId, managerId) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`
    const params = [firstName, lastName, roleId, managerId]
    db.promise().query(sql, params, (err, result) => {
        if (err) throw err
        console.log(`${firstName} ${lastName} added successfully!`)
    })
}

// Update an employee role
const updateEmployeeRole = (employeeId, roleId) => {
    const sql = `UPDATE employee
                    SET role_id = ?
                    WHERE id = ?`
    const params = [roleId, employeeId]
    db.promise().query(sql, params, (err, result) => {
        if (err) throw err
        console.log(`${employeeId}'s role updated successfully!`)
    })
}

const init = () => {
    // displayDepartment()
    // addDepartment('Marketing')
    // displayDepartment()
    // displayRole()
    // addRole('Software Engineer', 120000, 2)
    // displayRole()
    // displayRole()
    // displayEmployee()
    // displayEmployee()
    // addEmployee('Kevin', 'Tupik', 3, null)
    // displayEmployee()
    // displayRole()
    // displayEmployee()
    // updateEmployeeRole(1, 3)
    // displayEmployee()
    addEmployee('Kevin', 'Tupik', 2, null)
}

init()