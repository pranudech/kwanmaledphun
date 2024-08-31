import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    const { image_path, flag, id } = req.body
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `
        UPDATE main_image SET image_path = ?, flag = ? WHERE id = ?
        `
        , [image_path, flag, id]
    )
    return res.status(200).json(rows);
}