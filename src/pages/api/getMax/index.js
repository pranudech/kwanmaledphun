import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { table, column } = req.query;
    const promisePool = mysqlPool.promise();
    const [rows, fields] = await promisePool.query(
        `
        SELECT MAX(${column}) AS maxId FROM ${table}
        `
    )
    return res.status(200).json({
        maxId: (rows[0].maxId + 1),
        query: `SELECT MAX(${column}) FROM ${table}`
    });
}