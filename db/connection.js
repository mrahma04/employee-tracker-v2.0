const mysql = require('mysql2')
const fs = require('fs')

const db = mysql.createPool({
    host: 'db.stippled.art',
    ssl: {
        ca: fs.readFileSync('././certs/server-ca.cer'),
        cert: fs.readFileSync('././certs/client-cert.cer'),
        key: fs.readFileSync('././certs/client-key.cer')
    },
    user: 'root',
    password: 'Cisco123',
    database: 'employees'
},
    console.log('Connected to employees database.')
)

module.exports = db