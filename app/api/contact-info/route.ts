import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import ContactInfo from '@/lib/models/ContactInfo';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const contactInfo = await ContactInfo.findOne();
        if (!contactInfo) {
            return Response.json({ message: 'Contact info not found' }, { status: 404 });
        }
        return Response.json(contactInfo);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching contact info', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        let contactInfo = await ContactInfo.findOne();

        if (!contactInfo) {
            contactInfo = new ContactInfo(body);
            await contactInfo.save();
        } else {
            contactInfo = await ContactInfo.findByIdAndUpdate(
                contactInfo._id,
                body,
                { new: true, runValidators: true }
            );
        }

        return Response.json({ message: 'Contact info updated successfully', contactInfo });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating contact info', error: error.message }, { status: 500 });
    }
}
