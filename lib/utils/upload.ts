import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export interface UploadResult {
    success: boolean;
    imageUrl?: string;
    error?: string;
}

/**
 * Handle file upload from Next.js request
 * @param request - Next.js request object
 * @param fieldName - Form field name (default: 'image')
 * @returns Upload result with imageUrl or error
 */
export async function handleFileUpload(
    request: NextRequest,
    fieldName: string = 'image',
    prefix: string = 'upload'
): Promise<UploadResult> {
    try {
        const formData = await request.formData();
        const file = formData.get(fieldName) as File | null;

        if (!file) {
            return {
                success: false,
                error: 'No file uploaded',
            };
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
        if (!allowedTypes.includes(file.type)) {
            return {
                success: false,
                error: 'Only image or video files are allowed',
            };
        }

        // Validate file size (100MB limit to support videos)
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            return {
                success: false,
                error: 'File size exceeds 100MB limit',
            };
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.name);
        const filename = `${prefix}-${uniqueSuffix}${ext}`;
        const filepath = path.join(uploadsDir, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Return public URL
        const imageUrl = `/uploads/${filename}`;
        return {
            success: true,
            imageUrl,
        };
    } catch (error: any) {
        console.error('File upload error:', error);
        return {
            success: false,
            error: error.message || 'Error uploading file',
        };
    }
}
