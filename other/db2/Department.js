const con = require('./connection')
const db = require('./connection')

class Department {
    viewDepartment() {
        const sql = `SELECT * FROM department;`
        return con.promise().query(sql)
            .then(([rows]) => {
                const removeIndex = rows.reduce((firstVal, { id, ...x }) => {
                    firstVal[id] = x
                    return firstVal
                }, {}) // initial value before index 0
                console.table(removeIndex)
            })
            .catch(console.log)
            // .then(() => con.end())
    }
    createDepartment(name) {
        const sql = `INSERT INTO department (name)
                        VALUES (?)`
        const params = [name]
        con.promise().query(sql, params)
            .then(() => console.log(`Added ${name} to the database`))
            .catch(console.log)
            // .then(() => con.end())
    }
}

module.exports = Department