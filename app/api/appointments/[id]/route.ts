import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Appointment from '@/lib/models/Appointment';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const appointment = await Appointment.findById(params.id);
        if (!appointment) return Response.json({ message: 'Appointment not found' }, { status: 404 });
        return Response.json(appointment);
    } catch (error: any) {
        return Response.json({ message: 'Error fetching appointment', error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const appointment = await Appointment.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!appointment) return Response.json({ message: 'Appointment not found' }, { status: 404 });
        return Response.json({ message: 'Appointment updated successfully', appointment });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error updating appointment', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const appointment = await Appointment.findByIdAndDelete(params.id);
        if (!appointment) return Response.json({ message: 'Appointment not found' }, { status: 404 });
        return Response.json({ message: 'Appointment deleted successfully', appointment });
    } catch (error: any) {
        return Response.json({ message: 'Error deleting appointment', error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const { status } = await request.json();
        const appointment = await Appointment.findByIdAndUpdate(
            params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!appointment) return Response.json({ message: 'Appointment not found' }, { status: 404 });
        return Response.json({ message: 'Appointment status updated successfully', appointment });
    } catch (error: any) {
        return Response.json({ message: 'Error updating appointment status', error: error.message }, { status: 500 });
    }
}
