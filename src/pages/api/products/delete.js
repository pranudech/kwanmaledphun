import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { product_id } = req.query
    try {
        const promisePool = mysqlPool.promise()
        const [rows, fields] = await promisePool.query(
            `DELETE FROM product WHERE product_id = ?`,
            [parseInt(product_id)]
        )
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message, text: product_id })
    }
}