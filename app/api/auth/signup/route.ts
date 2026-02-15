import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/config/database';
import User from '@/lib/models/User';
import { generateToken } from '@/lib/utils/auth';

interface SignupRequest {
    email: string;
    password: string;
    name?: string;
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body: SignupRequest = await request.json();
        const { email, password, name } = body;

        // Validation
        if (!email || !password) {
            return Response.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return Response.json(
                { message: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return Response.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            name: name || '',
        });

        // Generate JWT token
        const token = generateToken(user._id.toString(), user.email);

        return Response.json(
            {
                message: 'User created successfully',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return Response.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
