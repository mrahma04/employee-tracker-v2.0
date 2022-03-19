const db = require('../db/connection')

class Employee {

    collectEmployeesAndRoles() {
        const employeeSql = `SELECT * FROM employee`

        const employeePromise = db.promise().query(employeeSql)
            .then(([rows]) => {
                return rows.map(elem => {
                    let arr = []
                    arr.push(elem.first_name, elem.last_name)
                    let name = arr.join(' ')
                    return name
                })
            })

        const roleSql = `SELECT * FROM role`

        const rolePromise = db.promise().query(roleSql)
            .then(([rows]) => {
                const arr = []
                rows.forEach(elem => arr.push(elem.title))
                return arr
            })

        return Promise.all([employeePromise, rolePromise]).then(values => values)
    }

    viewEmployee() {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id AS manager
                        FROM employee
                        INNER JOIN role ON employee.role_id = role.id
                        INNER JOIN department ON role.department_id = department.id;`

        return db.promise().query(sql)
            .then(([rows]) => {
                const removeIndex = rows.reduce((firstVal, { id, ...x }) => {
                    firstVal[id] = x
                    return firstVal
                }, {})
                console.table(removeIndex)
            })
            .catch(err => console.log(err))
    }
    createEmployee(firstName, lastName, roleName, employeeManager) {

        if (employeeManager === '') {
            employeeManager = null
            const roleIdSql = `SELECT * FROM role WHERE title = ?`
            const params1 = roleName

            const roleIdPromise = db.promise().query(roleIdSql, params1)
                .then(([rows]) => rows[0].id)

            // runs what's inside Promise.all ONLY after it resolved the roleIdPromise
            return Promise.all([roleIdPromise]).then(values => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?, ?, ?, ?)`
                const params2 = [firstName, lastName, values, employeeManager]
                return db.promise().query(sql, params2).then(() => console.log(`Added ${firstName} ${lastName} to the database`))
            })
        } else {
            let managerParams = []
            const [managerFirstName, managerLastName] = employeeManager.split(' ')
            managerParams.push(managerFirstName, managerLastName)

            const managerIdSql = `SELECT * FROM employee WHERE first_name = ? AND last_name = ?`
            const managerIdPromise = db.promise().query(managerIdSql, managerParams)
                .then(([rows]) => rows[0].id)

            // create a promise to get roleId using roleName
            const roleIdSql = `SELECT * FROM role WHERE title = ?`
            const params1 = roleName

            const roleIdPromise = db.promise().query(roleIdSql, params1)
                .then(([rows]) => rows[0].id)

            // runs what's inside Promise.all ONLY after it resolved the roleIdPromise
            return Promise.all([roleIdPromise, managerIdPromise]).then(values => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                VALUES (?, ?, ?, ?)`
                const resolvedRoleId = values[0]
                const resolvedManagerId = values[1] | null
                const params2 = [firstName, lastName, resolvedRoleId, resolvedManagerId]
                return db.promise().query(sql, params2).then(() => console.log(`Added ${firstName} ${lastName} to the database`))
            })
        }
    }
    updateEmployee(fullName, roleName) {

        // get new role id
        const getRoleIdSql = `SELECT *
                                FROM role
                                WHERE title = ?`
        const params2 = [roleName]

        const rolePromise = db.promise().query(getRoleIdSql, params2)
            .then(([rows]) => rows[0].id)
        // .then(() => console.log(roleId))

        // get employee id
        const getIdSql = `SELECT *
                            FROM employee
                            WHERE first_name = ? AND last_name = ?`
        const [firstName, lastName] = fullName.split(' ')
        const params3 = [firstName, lastName]

        const employeePromise = db.promise().query(getIdSql, params3)
            .then(([rows]) => rows[0].id)
        // .then(() => console.log(employeeId))

        return Promise.all([rolePromise, employeePromise]).then(values => {
            const updateRoleSql = `UPDATE employee
                                    SET role_id = ?
                                    WHERE id = ?`

            return db.promise().query(updateRoleSql, values).then(() => console.log(`${firstName} ${lastName}'s role updated`))
        })
    }
}

module.exports = Employee