const db = require('./db/connection')

db.promise().query(`SELECT * FROM employee`)
    .then(([rows]) => {
        console.log(rows)
    })