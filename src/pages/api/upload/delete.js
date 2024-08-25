import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { image } = req.body
    const filePath = path.join(process.cwd(), `/public/${image}`); // Adjust the path and file type as necessary
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting file', error: err });
        }
    });
    return res.status(200).json({ message: 'File deleted successfully' });
}