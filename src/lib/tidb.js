const mysql = require('mysql2')
// export const mysqlPool = mysql.createPool(process.env.MYSQL_URI)
export const mysqlPool = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'kwanmxwf_dev',
    password: process.env.DB_PASSWORD || '7?*VRnEAUU^B',
    database: process.env.DB_NAME || 'kwanmxwf_dev',
})