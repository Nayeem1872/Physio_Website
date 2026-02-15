import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import TeamMember from '@/lib/models/TeamMember';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

// GET /api/team - Get all team members (Public)
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const teamMembers = await TeamMember.find().sort({
            order: 1,
            createdAt: -1,
        });

        return Response.json({
            count: teamMembers.length,
            teamMembers,
        });
    } catch (error: any) {
        return Response.json(
            {
                message: 'Error fetching team members',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// POST /api/team - Add a new team member (Protected)
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // Verify authentication
        const authUser = verifyAuth(request);
        if (!authUser) {
            return unauthorizedResponse();
        }

        const body = await request.json();
        const teamMember = new TeamMember(body);
        await teamMember.save();

        return Response.json(
            {
                message: 'Team member added successfully',
                teamMember,
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
                message: 'Error adding team member',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
