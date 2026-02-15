import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import BlogCategory from '@/lib/models/BlogCategory';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const categories = await BlogCategory.find().sort({ name: 1 });
        return Response.json({ count: categories.length, categories });
    } catch (error: any) {
        return Response.json({ message: 'Error fetching categories', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const category = new BlogCategory(body);
        await category.save();
        return Response.json({ message: 'Category created successfully', category }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating category', error: error.message }, { status: 500 });
    }
}
