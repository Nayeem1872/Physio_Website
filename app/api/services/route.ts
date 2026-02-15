import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Service from '@/lib/models/Service';
import ServiceCategory from '@/lib/models/ServiceCategory';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        // Ensure ServiceCategory is registered for populate
        const _category = ServiceCategory;
        const services = await Service.find().populate('category').sort({ createdAt: -1 });
        return Response.json({ count: services.length, services });
    } catch (error: any) {
        console.error('Error in GET /api/services:', error);
        return Response.json({ message: 'Error fetching services', error: error.message, stack: error.stack }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const service = new Service(body);
        await service.save();
        return Response.json({ message: 'Service created successfully', service }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating service', error: error.message }, { status: 500 });
    }
}
