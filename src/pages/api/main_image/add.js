import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { image_path, flag } = req.body
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        INSERT INTO main_image (image_path, flag) VALUES (?, ?)
        `
        , [image_path, flag]
    )
    return res.status(200).json(rows);
}