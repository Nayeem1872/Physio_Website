import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import TeamMember from '@/lib/models/TeamMember';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

// GET /api/team/[id] - Get a single team member (Public)
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const teamMember = await TeamMember.findById(params.id);
        if (!teamMember) {
            return Response.json(
                { message: 'Team member not found' },
                { status: 404 }
            );
        }

        return Response.json(teamMember);
    } catch (error: any) {
        return Response.json(
            {
                message: 'Error fetching team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// PUT /api/team/[id] - Update a team member (Protected)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        // Verify authentication
        const authUser = verifyAuth(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const teamMember = await TeamMember.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!teamMember) {
            return Response.json(
                { message: 'Team member not found' },
                { status: 404 }
            );
        }

        return Response.json({
            message: 'Team member updated successfully',
            teamMember,
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
                message: 'Error updating team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// DELETE /api/team/[id] - Delete a team member (Protected)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        // Verify authentication
        const authUser = verifyAuth(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const teamMember = await TeamMember.findByIdAndDelete(params.id);

        if (!teamMember) {
            return Response.json(
                { message: 'Team member not found' },
                { status: 404 }
            );
        }

        return Response.json({
            message: 'Team member deleted successfully',
            teamMember,
        });
    } catch (error: any) {
        return Response.json(
            {
                message: 'Error deleting team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
