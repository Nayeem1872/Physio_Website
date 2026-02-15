import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import BlogCategory from '@/lib/models/BlogCategory';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const category = await BlogCategory.findById(params.id);
        if (!category) return Response.json({ message: 'Category not found' }, { status: 404 });
        return Response.json(category);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching category', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const category = await BlogCategory.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!category) return Response.json({ message: 'Category not found' }, { status: 404 });
        return Response.json({ message: 'Category updated successfully', category });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating category', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const category = await BlogCategory.findByIdAndDelete(params.id);
        if (!category) return Response.json({ message: 'Category not found' }, { status: 404 });
        return Response.json({ message: 'Category deleted successfully', category });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting category', error: error.message }, { status: 500 });
    }
}
