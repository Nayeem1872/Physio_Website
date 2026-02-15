import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Blog from '@/lib/models/Blog';
import BlogCategory from '@/lib/models/BlogCategory';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

// GET /api/blogs - Get all blogs (Public)
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const blogs = await Blog.find()
            .populate('category')
            .sort({ createdAt: -1 });

        return Response.json({
            count: blogs.length,
            blogs,
        });
    } catch (error: any) {
        return Response.json(
            {
                message: 'Error fetching blogs',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// POST /api/blogs - Create a new blog (Protected)
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const authUser = verifyAuth(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const blog = new Blog(body);
        await blog.save();

        return Response.json(
            {
                message: 'Blog created successfully',
                blog,
            },
            { status: 201 }
        );
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
                message: 'Error creating blog',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
