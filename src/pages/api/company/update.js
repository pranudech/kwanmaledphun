import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { company_name, company_image, id } = req.body
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        UPDATE company SET company_name = ?, company_image = ? WHERE company_id = ?
        `
        , [company_name, company_image, id]
    )
    return res.status(200).json(rows);
}