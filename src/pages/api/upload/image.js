import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import { mysqlPool } from "@lib/tidb";
import formidable from 'formidable';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parsing
    },
};

export default async function handler(req, res) {
    const pathTypeUpload = req.headers['pathtypeupload']; // Get pathTypeUpload from headers, default to 'company'
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const form = formidable({ multiples: true }); // Updated to use formidable function directly
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: "Error parsing the files" });
        }

        const file = files.file; // Access the uploaded file

        // Check if the file exists
        if (!file || !Array.isArray(file) || file.length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uploadedFile = file[0]; // Access the first file in the array

        // Log the file object for debugging
        console.log('Uploaded file:', uploadedFile);

        // Validate file properties
        if (!uploadedFile.originalFilename || !uploadedFile.filepath) {
            console.error('Invalid file properties:', {
                originalFilename: uploadedFile.originalFilename,
                filepath: uploadedFile.filepath
            });
            return res.status(400).json({ message: "Invalid file upload" });
        }

        // Define the upload directory and file path
        const uploadDir = path.join(process.cwd(), `public/kwanmaledpun/upload/${pathTypeUpload}`);
        const newFilename = `${Date.now()}-${uploadedFile.originalFilename}`;
        const filePath = path.join(uploadDir, newFilename);

        try {
            // Ensure the upload directory exists
            await fs.mkdir(uploadDir, { recursive: true });

            // Move the file to the upload directory
            await fs.rename(uploadedFile.filepath, filePath);

            console.log('File saved to:', filePath);
            res.status(200).json({ message: "File uploaded successfully", filePath, imagePath: `/kwanmaledpun/upload/${pathTypeUpload}/${newFilename}` });
        } catch (error) {
            console.error('Error saving the file:', error);
            res.status(500).json({ message: "Error saving the file" });
        }
    });
}