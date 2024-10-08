import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        SELECT * FROM company ORDER BY company_id
        `
    )
    return res.status(200).json(rows);
}