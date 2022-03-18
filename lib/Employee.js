const db = require('../db/connection')

class Employee {
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
    createEmployee(firstName, lastName, roleId, managerId) {
        if (managerId === '') {
            managerId = null
        }
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`

        const params = [firstName, lastName, roleId, managerId]

        db.promise().query(sql, params).then(() => console.log(`Added ${firstName} ${lastName} to the database`))
    }
    updateEmployee(firstName, lastName, roleName) {

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
        const params1 = [firstName, lastName]

        const employeePromise = db.promise().query(getIdSql, params1)
            .then(([rows]) => rows[0].id)
        // .then(() => console.log(employeeId))

        Promise.all([rolePromise, employeePromise]).then(values => {
            const updateRoleSql = `UPDATE employee
                                    SET role_id = ?
                                    WHERE id = ?`

            db.promise().query(updateRoleSql, values).then(() => console.log(`${firstName} ${lastName}'s role updated`))
        })

        // update employee rol
        // const updateRoleSql = `UPDATE employee
        //                         SET role_id = ?
        //                         WHERE id = ?`
        // const params3 = [roleId, employeeId]

        // db.promise().query(updateRoleSql, params3).then(() => console.log(`${firstName} ${lastName}'s role updated`))
    }
}

module.exports = Employee