import { ConnectDB } from '@/lib/config/db';
import ProfileModel from '@/lib/models/ProfileModel';
import { NextResponse } from 'next/server';

let dbConnected = false;

const LoadDB = async () => {
  if (!dbConnected) {
    await ConnectDB();
    dbConnected = true;
  }
};

export async function GET(request, { params }) {
  try {
    await LoadDB();
    const profile = await ProfileModel.findById(params.id);

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile', details: error.message },
      { status: 500 }
    );
  }
}
