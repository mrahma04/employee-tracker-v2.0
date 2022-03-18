const db = require('../db/connection')

class Department {
    viewDepartment() {
        const sql = `SELECT * FROM department;`
        return db.promise().query(sql).then(([rows]) => {
            const removeIndex = rows.reduce((firstVal, {id, ...x}) => {
                firstVal[id] = x
                return firstVal
            }, {}) // initial value before index 0
            console.table(removeIndex)
        })
    }
    createDepartment(name) {
        const sql = `INSERT INTO department (name)
                        VALUES (?)`
        const params = [name]
        db.promise().query(sql, params).then(() => console.log(`Added ${name} to the database`))
    }
}

module.exports = Department