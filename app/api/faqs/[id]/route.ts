import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import FAQ from '@/lib/models/FAQ';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const faq = await FAQ.findById(params.id);
        if (!faq) return Response.json({ message: 'FAQ not found' }, { status: 404 });
        return Response.json(faq);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching FAQ', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const faq = await FAQ.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!faq) return Response.json({ message: 'FAQ not found' }, { status: 404 });
        return Response.json({ message: 'FAQ updated successfully', faq });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating FAQ', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const faq = await FAQ.findByIdAndDelete(params.id);
        if (!faq) return Response.json({ message: 'FAQ not found' }, { status: 404 });
        return Response.json({ message: 'FAQ deleted successfully', faq });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting FAQ', error: error.message }, { status: 500 });
    }
}
