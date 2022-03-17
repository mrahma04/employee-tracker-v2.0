const Department = require('./lib/Department')
const Role = require('./lib/Role')
const Employee = require('./lib/Employee')

const db = require('./db/connection')

// const department = new Department()
// department.viewDepartment()
// department.createDepartment('Marketing')

// const role = new Role()
// role.viewRole()
// role.createRole('Customer Service', 50000, 2)
// role.viewRole()

const employee = new Employee()
// employee.viewEmployee()
// employee.createEmployee('Sad', 'Singh', 2)
// employee.viewEmployee()
// employee.viewEmployee()

// employee.updateEmployee('Mike', 'Chan', 'Salesperson')
// employee.viewEmployee()
// employee.updateEmployee('Mike', 'Chan', 'Lead Engineer')
employee.viewEmployee()
// const globalParams = []

// const getId = (firstName, lastName) => {
//     const sql = `SELECT *
//                     FROM employee
//                     WHERE first_name = ? AND last_name = ?`
//     const params = [firstName, lastName]

//     return db.promise().query(sql, params)
// }

// getId('Mike', 'Chan')
//     .then(([rows]) => {
//         const x = rows[0].id
//         return x
//     })
//     .then(x => globalParams.push(x))

// console.log(globalParams)


