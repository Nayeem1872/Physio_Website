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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const banner = await Banner.findById(params.id);
        if (!banner) return Response.json({ message: 'Banner not found' }, { status: 404 });
        return Response.json(banner);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching banner', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const formData = await request.formData();
        const section = formData.get('section') as string;
        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string;
        const isActive = formData.get('isActive') === 'true';

        // Check for existing banner
        const existingBanner = await Banner.findById(params.id);
        if (!existingBanner) {
            return Response.json({ message: 'Banner not found' }, { status: 404 });
        }

        const updates: any = {};
        if (section) updates.section = section;
        if (title) updates.title = title;
        if (subtitle) updates.subtitle = subtitle;
        if (typeof isActive !== 'undefined') updates.isActive = isActive;

        // Handle image removals/preservation
        const existingImagesJson = formData.get('existingImages') as string;
        let preservedImages: string[] = existingBanner.images || [];

        if (existingImagesJson) {
            try {
                preservedImages = JSON.parse(existingImagesJson);
            } catch (e) {
                console.error("Error parsing existingImages:", e);
            }
        }

        // Handle new image uploads
        const images = formData.getAll('images') as File[];
        let newUploadedUrls: string[] = [];

        if (images && images.length > 0) {
            // Filter out empty strings or non-File objects if any
            const actualFiles = images.filter(img => img instanceof File && img.size > 0);

            if (actualFiles.length > 0) {
                newUploadedUrls = await Promise.all(
                    actualFiles.map(image => uploadImage(image))
                );
            }
        }

        // Combine preserved images with new ones
        updates.images = [...preservedImages, ...newUploadedUrls];

        const updatedBanner = await Banner.findByIdAndUpdate(params.id, updates, { new: true, runValidators: true });

        return Response.json({ message: 'Banner updated successfully', banner: updatedBanner });
    } catch (error: any) {
        console.error("Error updating banner:", error);
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating banner', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const banner = await Banner.findByIdAndDelete(params.id);
        if (!banner) return Response.json({ message: 'Banner not found' }, { status: 404 });
        return Response.json({ message: 'Banner deleted successfully', banner });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting banner', error: error.message }, { status: 500 });
    }
}
