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

// GET all profiles (for ProfileList)
export async function GET(request) {
  try {
    await LoadDB();
    
    // Check if route is /api/profile/[id]
    const path = request.nextUrl.pathname.split('/');
    if (path.length === 4) {
      const id = path[3];
      const profile = await ProfileModel.findById(id);
      
      if (!profile) {
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(profile);
    }
    
    // Default: return all profiles
    const profiles = await ProfileModel.find({}).lean();
    
    // Only return necessary fields for list view
    const simplifiedProfiles = profiles.map(profile => ({
      _id: profile._id,
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      ethnicity: profile.ethnicity,
      occupation: profile.occupation,
      // Add other fields you want to display in the list
      image: profile.image || null
    }));
    
    return NextResponse.json(simplifiedProfiles);
    
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profiles', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new profile
export async function POST(request) {
  try {
    await LoadDB();
    const jsonData = await request.json();

    const profileData = {
      name: jsonData.name,
      email: jsonData.email,
      phone: jsonData.phone,
      password: jsonData.password,
      age: Number(jsonData.age),
      ethnicity: jsonData.ethnicity,
      gender: jsonData.gender,
      occupation: jsonData.occupation,
      education: jsonData.education,
      citizenshipStatus: jsonData.citizenshipStatus,
      maritalHistory: jsonData.maritalHistory,
      children: jsonData.children,
      relocation: jsonData.relocation,
      revert: jsonData.revert,
      medicalConditions: jsonData.medicalConditions,
      languages: jsonData.languages || [],
      aboutMe: jsonData.aboutMe,
      lookingForDetails: jsonData.lookingForDetails,
      additionalInfo: jsonData.additionalInfo,
      preferences: jsonData.preferences,
      references: jsonData.references || [],
      image: jsonData.image || null
    };

    // Validate required fields
    if (!profileData.name || !profileData.email || !profileData.password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const createdProfile = await ProfileModel.create(profileData);
    
    // Return simplified profile for immediate display
    const responseProfile = {
      _id: createdProfile._id,
      name: createdProfile.name,
      age: createdProfile.age,
      gender: createdProfile.gender,
      ethnicity: createdProfile.ethnicity,
      occupation: createdProfile.occupation,
      image: createdProfile.image || null
    };

    return NextResponse.json(
      { 
        message: 'Profile created successfully',
        profile: responseProfile 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create profile',
        details: error.message.includes('duplicate key') 
          ? 'Email already exists' 
          : error.message 
      },
      { status: 500 }
    );
  }
}