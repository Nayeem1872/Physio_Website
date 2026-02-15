import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Banner from '@/lib/models/Banner';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

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

        const body = await request.json();
        const banner = await Banner.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!banner) return Response.json({ message: 'Banner not found' }, { status: 404 });
        return Response.json({ message: 'Banner updated successfully', banner });
    } catch (error: any) {
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
