import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        INSERT INTO company (company_id, company_name, company_image) VALUES (?, ?, ?)
        `
        , [req.body.company_id, req.body.company_name, req.body.company_image]
    )
    return res.status(200).json(rows);
}