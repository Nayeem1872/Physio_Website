import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Milestone from '@/lib/models/Milestone';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const milestone = await Milestone.findById(params.id);
        if (!milestone) return Response.json({ message: 'Milestone not found' }, { status: 404 });
        return Response.json(milestone);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching milestone', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const milestone = await Milestone.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!milestone) return Response.json({ message: 'Milestone not found' }, { status: 404 });
        return Response.json({ message: 'Milestone updated successfully', milestone });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating milestone', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const milestone = await Milestone.findByIdAndDelete(params.id);
        if (!milestone) return Response.json({ message: 'Milestone not found' }, { status: 404 });
        return Response.json({ message: 'Milestone deleted successfully', milestone });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting milestone', error: error.message }, { status: 500 });
    }
}
