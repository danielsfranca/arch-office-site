
import { NextRequest, NextResponse } from 'next/server';
import { listFiles, downloadFile } from '@/lib/google-drive';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get('folderId') || undefined;
    const action = searchParams.get('action'); // "list" or "download"
    const fileId = searchParams.get('fileId');

    try {
        if (action === "download" && fileId) {
            // Stream file download
            const metadata = await downloadFile(fileId);
            return new NextResponse(metadata as any, {
                headers: {
                    'Content-Disposition': `attachment; filename="${fileId}"`, // Use name if passed
                },
            });
        }

        // Default: List Files
        const files = await listFiles(folderId);
        return NextResponse.json(files);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to interact with Google Drive" }, { status: 500 });
    }
}
