const db = require('../db/connection')

class Role {
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
    createRole(title, salary, departmentId) {
        const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`
        const params = [title, salary, departmentId]
        db.promise().query(sql, params).then(() => console.log(`Added ${title} to the database`))
    }
}

module.exports = Role