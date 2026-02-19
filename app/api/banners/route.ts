import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Banner from '@/lib/models/Banner';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';
import cloudinary from '@/lib/config/cloudinary';

// Configure runtime to handle file uploads
// export const runtime = 'nodejs'; // Use Node.js runtime for file handling if needed, but App Router handles this by default usually.

async function uploadImage(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: 'banners' },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result!.secure_url);
            }
        ).end(buffer);
    });
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
        return Response.json({ count: banners.length, banners });
    } catch (error: any) {
        return Response.json({ message: 'Error fetching banners', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const formData = await request.formData();
        const section = formData.get('section') as string;
        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string;
        const isActive = formData.get('isActive') === 'true';
        const images = formData.getAll('images') as File[];

        if (!images || images.length === 0) {
            return Response.json({ message: 'At least one image is required' }, { status: 400 });
        }

        const uploadedUrls = await Promise.all(
            images.map(image => uploadImage(image))
        );

        const banner = new Banner({
            section,
            title,
            subtitle,
            isActive,
            images: uploadedUrls
        });

        await banner.save();
        return Response.json({ message: 'Banner created successfully', banner }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating banner:", error);
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating banner', error: error.message }, { status: 500 });
    }
}
