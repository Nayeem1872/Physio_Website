import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Blog from '@/lib/models/Blog';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

// GET /api/blogs/[id]
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const blog = await Blog.findById(params.id).populate('category');
        if (!blog) {
            return Response.json(
                { message: 'Blog not found' },
                { status: 404 }
            );
        }

        return Response.json(blog);
    } catch (error: any) {
        return Response.json(
            {
                message: 'Error fetching blog',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// PUT /api/blogs/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const authUser = verifyAuth(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const blog = await Blog.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        ).populate('category');

        if (!blog) {
            return Response.json(
                { message: 'Blog not found' },
                { status: 404 }
            );
        }

        return Response.json({
            message: 'Blog updated successfully',
            blog,
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json(
                {
                    message: 'Validation error',
                    errors: error.errors,
                },
                { status: 400 }
            );
        }
        return Response.json(
            {
                message: 'Error updating blog',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// DELETE /api/blogs/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const authUser = verifyAuth(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const blog = await Blog.findByIdAndDelete(params.id);

        if (!blog) {
            return Response.json(
                { message: 'Blog not found' },
                { status: 404 }
            );
        }

        return Response.json({
            message: 'Blog deleted successfully',
            blog,
        });
    } catch (error: any) {
        return Response.json(
            {
                message: 'Error deleting blog',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
