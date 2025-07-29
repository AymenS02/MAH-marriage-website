import { ConnectDB } from '@/lib/config/db';
import ProfileModel from '@/lib/models/ProfileModel';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await ConnectDB();
    const profile = await ProfileModel.findById(params.id);
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}