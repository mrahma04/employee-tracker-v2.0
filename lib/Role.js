const db = require('../db/connection')

class Role {

    getRoles() {
        const sql = `SELECT * FROM role`
        return db.promise().query(sql)
            .then(([rows]) => {
                console.log(rows)
            })
    }

    viewRole() {
        const sql = `SELECT * FROM role`
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

    // createRole(title, salary, departmentId) {
    //     const sql = `INSERT INTO role (title, salary, department_id)
    //                     VALUES (?, ?, ?)`
    //     const params = [title, salary, departmentId]
    //     return db.promise().query(sql, params)
    //         .then(() => console.log(`Added ${title} to the database`))
    //         .catch(err => console.log(err))
    // }

    createRole(title, salary, deptName) {
        // create a promise to get deptId using deptName
        // feed that promise into a final Promise.all to add Role

        const deptIdSql = `SELECT * FROM department WHERE name = ?`
        const params1 = deptName

        const deptIdPromise = db.promise().query(deptIdSql, params1)
            // [rows] => [ { id: 1, name: 'Sales' }, { id: 6, name: 'Sales' } ]
            // rows[0].id => 1
            .then(([rows]) => rows[0].id)

        return Promise.all([deptIdPromise]).then(values => {
            const updateSql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`
            const params2 = [title, salary, values]

            return db.promise().query(updateSql, params2)
                .then(() => console.log(`Added ${title} to the database`))
        })
    }
}

module.exports = Role