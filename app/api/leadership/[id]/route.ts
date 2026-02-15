import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Leadership from '@/lib/models/Leadership';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const leader = await Leadership.findById(params.id);
        if (!leader) return Response.json({ message: 'Leader not found' }, { status: 404 });
        return Response.json(leader);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching leader', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const leader = await Leadership.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!leader) return Response.json({ message: 'Leader not found' }, { status: 404 });
        return Response.json({ message: 'Leader updated successfully', leader });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating leader', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const leader = await Leadership.findByIdAndDelete(params.id);
        if (!leader) return Response.json({ message: 'Leader not found' }, { status: 404 });
        return Response.json({ message: 'Leader deleted successfully', leader });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting leader', error: error.message }, { status: 500 });
    }
}
