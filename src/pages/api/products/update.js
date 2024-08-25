import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    try {
        const { product_name, price, size_product, detail, company_id, subtype_id, product_image1, product_image2, product_image3, recommended_product, id } = req.body
        const promisePool = mysqlPool.promise()
        const [rows, fields] = await promisePool.query(
            `
        UPDATE product SET product_name = ?, price = ?, size_product = ?, detail = ?, company_id = ?, subtype_id = ?, product_image1 = ?, product_image2 = ?, product_image3 = ?, recommended_product = ? WHERE product_id = ?
        `
            , [product_name, price, size_product, detail, company_id, subtype_id, product_image1, product_image2, product_image3, recommended_product, id]
        )
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}