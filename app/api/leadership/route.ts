import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Leadership from '@/lib/models/Leadership';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const leaders = await Leadership.find().sort({ order: 1, createdAt: -1 });
        return Response.json({ count: leaders.length, leaders });
    } catch (error: any) {
        return Response.json({ message: 'Error fetching leaders', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const leader = new Leadership(body);
        await leader.save();
        return Response.json({ message: 'Leader created successfully', leader }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating leader', error: error.message }, { status: 500 });
    }
}
