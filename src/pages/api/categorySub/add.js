import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { subtype_id, subtype_name, type_id, icon } = req.body
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        INSERT INTO product_subtype (subtype_id, subtype_name, type_id, icon) VALUES (?, ?, ?, ?)
        `
        , [subtype_id, subtype_name, type_id, icon]
    )
    return res.status(200).json(rows);
}