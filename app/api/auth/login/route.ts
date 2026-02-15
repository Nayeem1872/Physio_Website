import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/config/database';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/utils/auth';

interface LoginRequest {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body: LoginRequest = await request.json();
        const { email, password } = body;

        // Validation
        if (!email || !password) {
            return Response.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return Response.json(
                { message: 'Invalid credentials' },
                { status: 400 }
            );
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.json(
                { message: 'Invalid credentials' },
                { status: 400 }
            );
        }

        // Generate JWT token
        const token = generateToken(user._id.toString(), user.email);

        return Response.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return Response.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
