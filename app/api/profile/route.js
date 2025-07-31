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

// GET → list all profiles
export async function GET() {
  try {
    await LoadDB();
    const profiles = await ProfileModel.find({}).lean();
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profiles', details: error.message },
      { status: 500 }
    );
  }
}

// POST → create new profile (application process)
export async function POST(request) {
  try {
    await LoadDB();
    const jsonData = await request.json();
    
    console.log('Received form data:', jsonData); // Debug log
    console.log('Ethnicity from request:', jsonData.ethnicity); // Debug log
    console.log('Hijab from request:', jsonData.hijab); // Debug log

    const profileData = {
      name: jsonData.name,
      email: jsonData.email,
      phone: jsonData.phone,
      password: jsonData.password,
      age: jsonData.age ? Number(jsonData.age) : null,
      ethnicity: jsonData.ethnicity,
      gender: jsonData.gender,
      occupation: jsonData.occupation,
      education: jsonData.education,
      citizenshipStatus: jsonData.citizenshipStatus,
      maritalHistory: jsonData.maritalHistory,
      children: jsonData.children,
      relocation: jsonData.relocation,
      hijab: jsonData.hijab,
      revert: jsonData.revert,
      medicalConditions: jsonData.medicalConditions,
      languages: jsonData.languages || [],
      aboutMe: jsonData.aboutMe,
      lookingForDetails: jsonData.lookingForDetails,
      additionalInfo: jsonData.additionalInfo,
      preferences: jsonData.preferences,
      references: jsonData.references || [],
    };

    if (!profileData.name || !profileData.email || !profileData.password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const createdProfile = await ProfileModel.create(profileData);
    
    return NextResponse.json(
      { 
        message: 'Profile created successfully', 
        profile: createdProfile 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating profile:', error); // 👈 Check terminal output
    return NextResponse.json(
      {
        error: 'Failed to create profile',
        details: error.message
      },
      { status: 500 }
    );
  }
}
