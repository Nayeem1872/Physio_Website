import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Appointment from '@/lib/models/Appointment';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const appointments = await Appointment.find().sort({ appointmentDate: -1, appointmentTime: -1 });
        return Response.json({ count: appointments.length, appointments });
    } catch (error: any) {
        return Response.json({ message: 'Error fetching appointments', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        // Handle mapping from simplified forms (like the Hero section)
        if (body.name && !body.firstName) {
            const parts = body.name.trim().split(/\s+/);
            body.firstName = parts[0];
            if (parts.length > 1 && !body.lastName) {
                body.lastName = parts.slice(1).join(' ');
            }
        }

        if (body.date && !body.preferredDate) {
            body.preferredDate = body.date;
        }

        const appointment = new Appointment(body);
        await appointment.save();
        return Response.json({ message: 'Appointment created successfully', appointment }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating appointment', error: error.message }, { status: 500 });
    }
}
