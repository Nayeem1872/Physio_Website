import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Service from '@/lib/models/Service';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const service = await Service.findById(params.id).populate('category');
        if (!service) return Response.json({ message: 'Service not found' }, { status: 404 });
        return Response.json(service);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching service', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const service = await Service.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }).populate('category');
        if (!service) return Response.json({ message: 'Service not found' }, { status: 404 });
        return Response.json({ message: 'Service updated successfully', service });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating service', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const service = await Service.findByIdAndDelete(params.id);
        if (!service) return Response.json({ message: 'Service not found' }, { status: 404 });
        return Response.json({ message: 'Service deleted successfully', service });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting service', error: error.message }, { status: 500 });
    }
}
