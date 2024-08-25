import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { subtype_name, type_id, icon, id } = req.body
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        UPDATE product_subtype SET subtype_name = ?, type_id = ?, icon = ? WHERE subtype_id = ?
        `
        , [subtype_name, type_id, icon, id]
    )
    return res.status(200).json(rows);
}