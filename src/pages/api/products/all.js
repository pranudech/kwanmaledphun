import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";

export default async function handler(req, res) {
    try {
        const params = req.body
        const promisePool = mysqlPool.promise()
        const [rows, fields] = await promisePool.query(
            `
        SELECT 
        p.product_id,
        pt.type_id,
        pt.type_name,
        ps.subtype_id,
        ps.subtype_name,
        (SELECT company_id FROM company c WHERE company_id = p.company_id ) AS company_id,
        (SELECT company_name FROM company c WHERE company_id = p.company_id ) AS company_name,
        p.product_id,
        p.product_name,
        p.price,
        p.size_product,
        p.detail,
        p.product_image1,
        p.product_image2,
        p.product_image3 ,
        p.recommended_product 
        FROM product_type pt JOIN product_subtype ps ON pt.type_id = ps.type_id JOIN product p ON p.subtype_id = ps.subtype_id
        WHERE 1=1
        ${params.recommended_product > 0 ? ` AND p.recommended_product = ${parseInt(params.recommended_product)}` : ''}
        ${params.subtype_id > 0 ? ` AND ps.subtype_id = ${parseInt(params.subtype_id)}` : ''}
        ORDER BY p.product_name 
        `
        )
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}