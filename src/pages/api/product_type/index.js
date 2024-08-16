import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `SELECT * FROM product_type;`
    )
    // return NextResponse.json(rows)
    return res.status(200).json(rows);
}