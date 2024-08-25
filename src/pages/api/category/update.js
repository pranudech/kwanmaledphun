import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { type_name, icon, id } = req.body
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        UPDATE product_type SET type_name = ?, icon = ? WHERE type_id = ?
        `
        , [type_name, icon, id]
    )
    return res.status(200).json(rows);
}