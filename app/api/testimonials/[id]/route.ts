import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Testimonial from '@/lib/models/Testimonial';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const testimonial = await Testimonial.findById(params.id);
        if (!testimonial) return Response.json({ message: 'Testimonial not found' }, { status: 404 });
        return Response.json(testimonial);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching testimonial', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!testimonial) return Response.json({ message: 'Testimonial not found' }, { status: 404 });
        return Response.json({ message: 'Testimonial updated successfully', testimonial });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating testimonial', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const testimonial = await Testimonial.findByIdAndDelete(params.id);
        if (!testimonial) return Response.json({ message: 'Testimonial not found' }, { status: 404 });
        return Response.json({ message: 'Testimonial deleted successfully', testimonial });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting testimonial', error: error.message }, { status: 500 });
    }
}
