
import { google } from 'googleapis';
import { Readable } from 'stream';

// Load credentials from environment variables
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Initialize Google Drive API Client
// Ideally, use a Service Account for server-side integration
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // handle newlines in env var
    },
    scopes: SCOPES,
});

export const drive = google.drive({ version: 'v3', auth });

export async function listFiles(folderId?: string) {
    try {
        const query = folderId
            ? `'${folderId}' in parents andtrashed = false`
            : "trashed = false and 'root' in parents"; // Default to root if no folderId

        const res = await drive.files.list({
            pageSize: 20,
            fields: 'nextPageToken, files(id, name, mimeType, webViewLink, iconLink, size, createdTime)',
            q: query,
            orderBy: 'folder, name',
        });
        return res.data.files;
    } catch (error) {
        console.error('Error listing files from Google Drive:', error);
        return []; // Return empty array on error to prevent crash
    }
}

export async function getFileMetadata(fileId: string) {
    try {
        const res = await drive.files.get({
            fileId: fileId,
            fields: 'id, name, mimeType, webViewLink, size',
        });
        return res.data;
    } catch (error) {
        console.error('Error getting file metadata:', error);
        return null;
    }
}

export async function downloadFile(fileId: string) {
    try {
        const res = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' }
        );
        return res.data;
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
}
