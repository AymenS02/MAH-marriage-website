import { ConnectDB } from '@/lib/config/db';
import ProfileModel from '@/lib/models/ProfileModel';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

let dbConnected = false;

const LoadDB = async () => {
  if (!dbConnected) {
    await ConnectDB();
    dbConnected = true;
  }
};

// GET - Fetch profile(s)
export async function GET(request) {
  try {
    await LoadDB();
    
    const path = request.nextUrl.pathname.split('/');
    
    // Handle single profile request (GET /api/profile/[id])
    if (path.length === 4) {
      const id = path[3];
      console.log('API: Searching for profile with ID:', id);
      console.log('API: Path segments:', path);
      
      // Check if the ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('API: Invalid ObjectId format');
        return NextResponse.json(
          { error: 'Invalid profile ID format' },
          { status: 400 }
        );
      }
      
      const profile = await ProfileModel.findById(id);
      console.log('API: Profile found:', !!profile);
      
      if (!profile) {
        console.log('API: No profile found in database');
        return NextResponse.json(
          { error: 'Profile not found' },
          { status: 404 }
        );
      }
      
      // Return FULL profile data for detail page
      return NextResponse.json({
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        age: profile.age,
        gender: profile.gender,
        ethnicity: profile.ethnicity,
        occupation: profile.occupation,
        education: profile.education,
        citizenshipStatus: profile.citizenshipStatus,
        maritalHistory: profile.maritalHistory,
        children: profile.children,
        relocation: profile.relocation,
        revert: profile.revert,
        medicalConditions: profile.medicalConditions,
        languages: profile.languages || [],
        aboutMe: profile.aboutMe,
        lookingForDetails: profile.lookingForDetails,
        additionalInfo: profile.additionalInfo,
        preferences: profile.preferences,
        references: profile.references || [],
        image: profile.image || null
      });
    }
    
    // Default: return SIMPLIFIED profiles for list view
    const profiles = await ProfileModel.find({}).lean();
    console.log('API: Found', profiles.length, 'profiles in database');
    console.log('API: Profile IDs:', profiles.map(p => p._id));
    
    const simplifiedProfiles = profiles.map(profile => ({
      _id: profile._id,
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      occupation: profile.occupation,
      education: profile.education,
      citizenshipStatus: profile.citizenshipStatus,
      languages: profile.languages || [],
      aboutMe: profile.aboutMe, // For the preview card
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