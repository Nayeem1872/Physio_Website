import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/config/database';
import User from '@/lib/models/User';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function PUT(request: NextRequest) {
    try {
        await connectDB();

        // Verify authentication
        const authUser = verifyAuth(request);
        if (!authUser) {
            return unauthorizedResponse('No token, authorization denied');
        }

        const body = await request.json();
        const { name, email, currentPassword, newPassword } = body;
        const userId = authUser.id;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return Response.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Update name if provided
        if (name !== undefined) {
            user.name = name.trim();
        }

        // Update email if provided
        if (email !== undefined) {
            const emailTrimmed = email.trim().toLowerCase();

            // Check if email is valid
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(emailTrimmed)) {
                return Response.json(
                    { message: 'Please provide a valid email' },
                    { status: 400 }
                );
            }

            // Check if email is already taken by another user
            if (emailTrimmed !== user.email) {
                const existingUser = await User.findOne({ email: emailTrimmed });
                if (existingUser) {
                    return Response.json(
                        { message: 'Email already in use' },
                        { status: 400 }
                    );
                }
                user.email = emailTrimmed;
            }
        }

        // Update password if provided
        if (newPassword !== undefined) {
            // Require current password for password change
            if (!currentPassword) {
                return Response.json(
                    { message: 'Current password is required to change password' },
                    { status: 400 }
                );
            }

            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return Response.json(
                    { message: 'Current password is incorrect' },
                    { status: 401 }
                );
            }

            // Validate new password
            if (newPassword.length < 6) {
                return Response.json(
                    { message: 'New password must be at least 6 characters' },
                    { status: 400 }
                );
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // Save updated user
        await user.save();

        return Response.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return Response.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
