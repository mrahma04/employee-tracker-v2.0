const mysql = require('mysql2')
const fs = require('fs')

const con = mysql.createPool(
    {
        host: 'db.stippled.art',
        ssl: {
            ca: fs.readFileSync('././certs/server-ca.cer'),
            cert: fs.readFileSync('././certs/client-cert.cer'),
            key: fs.readFileSync('././certs/client-key.cer')
        },
        user: 'root',
        password: 'Cisco123',
        database: 'employees'
    }
);
// con.promise().query("SELECT * FROM employee")
//     .then(([rows, fields]) => {
//         console.log(rows);
//     })
//     .catch(console.log)
//     .then(() => con.end());

module.exports = con