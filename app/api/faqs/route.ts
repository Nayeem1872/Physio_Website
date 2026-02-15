import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import FAQ from '@/lib/models/FAQ';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
        return Response.json({ count: faqs.length, faqs });
    } catch (error: any) {
        return Response.json({ message: 'Error fetching FAQs', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const faq = new FAQ(body);
        await faq.save();
        return Response.json({ message: 'FAQ created successfully', faq }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating FAQ', error: error.message }, { status: 500 });
    }
}
