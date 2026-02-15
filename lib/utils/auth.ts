import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface JwtPayload {
    id: string;
    email: string;
}

/**
 * Verify JWT token from Next.js request headers
 * @param request - Next.js request object
 * @returns Decoded JWT payload or null if invalid
 */
export function verifyAuth(request: NextRequest): JwtPayload | null {
    try {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.replace('Bearer ', '');
        const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('Auth verification error:', error);
        return null;
    }
}

/**
 * Generate JWT token for user
 * @param userId - User ID
 * @param email - User email
 * @returns JWT token
 */
export function generateToken(userId: string, email: string): string {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const jwtExpire = process.env.JWT_EXPIRE || '7d';

    return jwt.sign(
        { id: userId, email },
        jwtSecret,
        { expiresIn: jwtExpire }
    );
}

/**
 * Create unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
    return Response.json({ message }, { status: 401 });
}
