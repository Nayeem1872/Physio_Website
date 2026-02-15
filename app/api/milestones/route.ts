import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Milestone from '@/lib/models/Milestone';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const milestones = await Milestone.find().sort({ order: 1, createdAt: -1 });
        return Response.json({ count: milestones.length, milestones });
    } catch (error: any) {
        return Response.json({ message: 'Error fetching milestones', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const milestone = new Milestone(body);
        await milestone.save();
        return Response.json({ message: 'Milestone created successfully', milestone }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating milestone', error: error.message }, { status: 500 });
    }
}
