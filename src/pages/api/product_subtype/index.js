import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const type_id = req.query.type_id
    const promisePool = mysqlPool.promise()
    if (!type_id) {
        return res.status(400).json({ message: 'type_id is required' })
    }
    if (type_id === 'all') {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM product_subtype;`
        )
        return res.status(200).json(rows);
    } else {
        const [rows, fields] = await promisePool.query(
            `SELECT * FROM product_subtype WHERE type_id = ?;`, [type_id]
        )
        return res.status(200).json(rows);
    }
}