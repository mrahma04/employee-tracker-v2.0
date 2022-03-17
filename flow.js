const inquirer = require('inquirer')

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter Department name:'
        }
    ]).then(answers => {
        console.log(`ADD DEPARTMENT SQL FUNCTION GOES HERE`)
        continuePrompt()
    })
}

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter Role name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter Role salary:'
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Enter Role department:'
        }
    ]).then(answers => {
        console.log(`ADD ROLE SQL FUNCTION GOES HERE`)
        continuePrompt()
    })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: `Enter employee's first name:`
        },
        {
            type: 'input',
            name: 'lastName',
            message: `Enter employee's last name:`
        },
        {
            type: 'input',
            name: 'employeeRole',
            message: `Enter employee's role:`
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: `Enter employee's manager:`
        }
    ]).then(answers => {
        console.log(`ADD EMPLOYEE SQL FUNCTION GOES HERE`)
        continuePrompt()
    })
}


const initialPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Done']
        }
    ]).then(answers => {
        if (answers.task === 'View all Departments') {
            console.log(`DEPARTMENT TABLE GOES HERE`)
            continuePrompt()
        }
        if (answers.task === 'View all Roles') {
            console.log(`ROLE TABLE GOES HERE`)
            continuePrompt()
        }
        if (answers.task === 'View all Employees') {
            console.log(`EMPLOYEE TABLE GOES HERE`)
            continuePrompt()
        }
        if (answers.task === 'Add a Department') {
            // console.log(`ADD DEPARTMENT PROMPT GOES HERE`)
            addDepartment()
        }
        if (answers.task === 'Add a Role') {
            // console.log(`ADD ROLE PROMPT GOES HERE`)
            addRole()
        }
        if (answers.task === 'Add an Employee') {
            // console.log(`ADD ROLE PROMPT GOES HERE`)
            addEmployee()
        }
        if (answers.task === 'Done') {
            console.log(`All Done!`)
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
        }
    })
}

initialPrompt()
