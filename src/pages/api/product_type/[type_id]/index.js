import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    console.log('req.query', req.query)
    const type_id = req.query.type_id
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `SELECT * FROM product_type WHERE type_id = ?;`, [type_id]
    )
    return res.status(200).json(rows);
}