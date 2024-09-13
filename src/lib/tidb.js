const mysql = require('mysql2')
// export const mysqlPool = mysql.createPool(process.env.MYSQL_URI)
export const mysqlPool = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kwanmxwf_dev',
    password: '7?*VRnEAUU^B',
    database: 'kwanmxwf_dev',
})