import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Banner from '@/lib/models/Banner';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

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

        const body = await request.json();
        const banner = new Banner(body);
        await banner.save();
        return Response.json({ message: 'Banner created successfully', banner }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating banner', error: error.message }, { status: 500 });
    }
}
