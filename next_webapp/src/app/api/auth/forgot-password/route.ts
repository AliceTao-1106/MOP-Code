import { NextResponse } from 'next/server';
import { errorResponse } from '@/app/api/library/errorResponse';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        return NextResponse.json(
            { success: true, message: 'Forgot password endpoint ready', data: { email } },
            { status: 200 },
        );
    } catch (error) {
        console.error('Forgot Password Error:', error);
        return errorResponse('Internal Server Error', 500, 'INTERNAL_ERROR');
    }
}
