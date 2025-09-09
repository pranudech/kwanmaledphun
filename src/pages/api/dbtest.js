const mysql = require('mysql2')
export default async function handler(req, res) {
  try {
    const conn = await mysql.createConnection({
      host: "mysql-db",
      user: "kwanmxwf_main",
      password: "yourpassword",
      database: "kwanmxwf_main",
    });

    const [rows] = await conn.query("SELECT NOW() as now");
    await conn.end();

    res.status(200).json({ success: true, time: rows[0].now });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
