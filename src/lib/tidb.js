const mysql = require('mysql2')
export const mysqlPool = mysql.createPool(process.env.MYSQL_URI)
// export const mysqlPool = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 3306,
//     user: process.env.DB_USER || 'kwanmxwf_main',
//     password: process.env.DB_PASSWORD || 'P7CcI[T~k)i8',
//     database: process.env.DB_NAME || 'kwanmxwf_main',
// })