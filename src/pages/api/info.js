import { NextResponse } from "next/server";
import { mysqlPool } from "@lib/tidb";
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { image } = req.body;
    const filePath = path.join(process.cwd(), `/public/${image}`);

    // Additional server info
    const serverInfo = {
        method: req.method,
        headers: req.headers,
        url: req.url,
        timestamp: new Date().toISOString(),
    };

    return res.status(200).json({ filePath: filePath, serverInfo: serverInfo });
}