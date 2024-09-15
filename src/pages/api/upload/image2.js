import { NextResponse } from "next/server";
import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parsing
    },
};

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathTypeUpload = req.headers['pathtypeupload'];
        const uploadDir = path.join(process.cwd(), `public/kwanmaledpun/upload/${pathTypeUpload}`);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const newFilename = `${Date.now()}-${file.originalname}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Error uploading the file" });
        }

        // Check if the file exists
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Log the file object for debugging
        console.log('Uploaded file:', req.file);

        // Define the file path
        const filePath = req.file.path;
        const imagePath = `/kwanmaledpun/upload/${req.headers['pathtypeupload']}/${req.file.filename}`;

        // Copy the file to the destination
        const destinationPath = path.join(process.cwd(), `public/kwanmaledpun/upload/${req.headers['pathtypeupload']}/${req.file.filename}`);
        try {
            await fs.copyFile(filePath, destinationPath);
            console.log('File saved to:', destinationPath);
            res.status(200).json({ message: "File uploaded successfully", filePath: destinationPath, imagePath });
        } catch (copyError) {
            console.error('Error copying the file:', copyError);
            res.status(500).json({ message: "Error saving the file" });
        }
    });
}