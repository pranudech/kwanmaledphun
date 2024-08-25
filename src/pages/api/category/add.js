import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { type_id, type_name, icon } = req.body
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        INSERT INTO product_type (type_id, type_name, icon) VALUES (?, ?, ?)
        `
        , [type_id, type_name, icon]
    )
    return res.status(200).json(rows);
}