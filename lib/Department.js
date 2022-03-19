const db = require('../db/connection')

class Department {

    listDepartment() {
        const sql = `SELECT * FROM department`
        return db.promise().query(sql)
            .then(([rows]) => {
                const arr = []
                rows.forEach(elem => {
                    arr.push(elem.name)
                })
                return arr
            })
    }

    viewDepartment() {
        const sql = `SELECT * FROM department`
        return db.promise().query(sql)
            .then(([rows]) => {
                const removeIndex = rows.reduce((firstVal, { id, ...x }) => {
                    firstVal[id] = x
                    return firstVal
                }, {}) // initial value before index 0
                console.table(removeIndex)
            })
            .catch(err => console.log(err))
    }
    createDepartment(name) {
        const sql = `INSERT INTO department (name)
                        VALUES (?)`
        const params = [name]
        return db.promise().query(sql, params)
            .then(() => console.log(`Added ${name} to the database`))
            .catch(err => console.log(err))
    }
}

module.exports = Department