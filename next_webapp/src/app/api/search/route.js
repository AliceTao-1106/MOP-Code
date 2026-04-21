import { NextResponse } from 'next/server';
import { errorResponse } from '@/app/api/library/errorResponse';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') ?? null;
    const title = searchParams.get('title') ?? null;
    const category = searchParams.get('category') ?? null;
    const tag = searchParams.get('tag') ?? null;

    return NextResponse.json(
      { success: true, message: 'Search endpoint ready', filters: { q, title, category, tag } },
      { status: 200 },
    );
  } catch (error) {
    console.error('[GET /api/search] unexpected error:', error);
    return errorResponse('Internal server error', 500, 'INTERNAL_ERROR');
  }
}
