// mysql --ssl-ca=./certs/server-ca.cer --ssl-cert=./certs/client-cert.cer --ssl-key=./certs/client-key.cer  --host=db.stippled.art --user=root -p

const inquirer = require('inquirer')

const db = require('./db/connection')

const Department = require('./lib/Department')
const Role = require('./lib/Role')
const Employee = require('./lib/Employee')

const department = new Department()
const role = new Role()
const employee = new Employee()

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter Department name:'
        }
    ]).then(answers => {
        // console.log(answers)
        // console.log(`ADD DEPARTMENT SQL FUNCTION GOES HERE`)
        // continuePrompt()
        department.createDepartment(answers.departmentName)
            // wait for the create function to finished and THEN give continuePrompt
            .then(() => continuePrompt())
    })
}

const addRole = () => {
    department.listDepartment()
        .then(answers => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter Role name:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter Role salary:'
                },
                {
                    type: 'list',
                    name: 'roleDeptId',
                    message: 'Select Department:',
                    choices: answers
                }
            ])
                .then(answers => {
                    // console.log(answers)
                    // console.log(`ADD ROLE SQL FUNCTION GOES HERE`)
                    role.createRole(answers.title, answers.salary, answers.roleDeptId)
                        // placing the .then here is very important
                        // it'll wait for the crateRole funciton to finish and THEN provide continuePrompt
                        .then(() => continuePrompt())
                })
        })
}

const addEmployee = () => {

    role.getRoles()
        .then(roles => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: `Enter new employee's first name:`
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: `Enter new employee's last name:`
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Select new Employee role:',
                    choices: roles
                },
                {
                    type: 'input',
                    name: 'employeeManager',
                    message: `Enter new employee's manager (leave blank if none):`
                }
            ]).then(answers => {
                employee.createEmployee(answers.firstName, answers.lastName, answers.employeeRole, answers.employeeManager)
                    .then(() => continuePrompt())
            })
        })

    // return inquirer.prompt([
    //     {
    //         type: 'input',
    //         name: 'firstName',
    //         message: `Enter new employee's first name:`
    //     },
    //     {
    //         type: 'input',
    //         name: 'lastName',
    //         message: `Enter new employee's last name:`
    //     },
    //     {
    //         type: 'input',
    //         name: 'employeeRole',
    //         message: `Enter new employee's role:`
    //     },
    //     {
    //         type: 'input',
    //         name: 'employeeManager',
    //         message: `Enter new employee's manager:`
    //     }
    // ]).then(answers => {
    //     console.log(answers)
    //     console.log(`ADD EMPLOYEE SQL FUNCTION GOES HERE`)
    //     continuePrompt()
    // })
}

// const employeeList = ['Malia Brown', 'Sarah Lourd']
// const roleList = ['Salesperson', 'Lead Engineer']
// const departmentList = ['Sales', 'Engineering']

const updateEmployee = () => {

    employee.collectEmployeesAndRoles()
        .then(([employees, roles]) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeName',
                    message: `Which employee's role do you want to update?`,
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: `Select employee's new role:`,
                    choices: roles
                }
            ]).then(answers => {
                employee.updateEmployee(answers.employeeName, answers.employeeRole)
                    .then(() => continuePrompt())
            })
        })
}

const initialPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Done']
        }
    ]).then(answers => {
        if (answers.task === 'View all Departments') {
            // console.log(`DEPARTMENT TABLE GOES HERE`)
            // continuePrompt()
            department.viewDepartment()
                .then(() => continuePrompt())
        }
        if (answers.task === 'View all Roles') {
            // console.log(`ROLE TABLE GOES HERE`)
            // continuePrompt()
            role.viewRole()
                .then(() => continuePrompt())
        }
        if (answers.task === 'View all Employees') {
            // console.log(`EMPLOYEE TABLE GOES HERE`)
            // continuePrompt()
            employee.viewEmployee()
                .then(() => continuePrompt())
        }
        if (answers.task === 'Add a Department') {
            // console.log(`ADD DEPARTMENT PROMPT GOES HERE`)
            addDepartment()
        }
        if (answers.task === 'Add a Role') {
            console.log(`ADD ROLE PROMPT GOES HERE`)
            addRole()
        }
        if (answers.task === 'Add an Employee') {
            console.log(`ADD EMPLOYEE PROMPT GOES HERE`)
            addEmployee()
        }
        if (answers.task === 'Update an Employee Role') {
            console.log(`UPDATE EMPLOYEE ROLE PROMPT GOES HERE`)
            updateEmployee()
        }
        if (answers.task === 'Done') {
            console.log(`All Done!`)
            db.end()
        }
    })
}

const continuePrompt = () => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to continue?',
            default: false
        }
    ]).then((answers) => {
        if (answers.continue) {
            initialPrompt()
        } else {
            console.log('All Done!')
            db.end()
        }
    })
}

initialPrompt()

// department.listDepartment()
//     .then(answers => console.log(answers))

// role.createRole('Salesperson III', 100000, 'Sales')
    // .then(values => console.log(values))

// role.getRoles()
//     .then(values => console.log(values))

// employee.createEmployee('Salesperson')
//     .then(values => console.log(values))

// employee.listEmployees()
//     .then(values => console.log(values))

// employee.collectEmployeeRoles()
//     .then(values => console.log(values))