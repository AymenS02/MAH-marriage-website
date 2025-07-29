'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useRouter } from 'next/navigation';

const ProfilePage = ({ params }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('Fetching profile with ID:', params._id);
        const response = await fetch(`/api/profile/${params._id}`);
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          const errorData = await response.text();
          console.log('Error response:', errorData);
          throw new Error('Profile not found');
        }
        const data = await response.json();
        console.log('Profile data received:', data);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [params._id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-red-600">Error: {error}</h2>
      <button 
        onClick={() => router.push('/admin')}
        className="mt-4 bg-green-600 border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Return To Admin Page
      </button>
    </div>
  );

  // Formatting helper functions
  const formatYesNo = (value) => value === true ? 'Yes' : value === false ? 'No' : value || 'Not specified';
  const formatLanguages = () => {
    if (!profile.languages?.length) return 'None specified';
    return profile.languages.map(lang => `${lang.language} (${lang.fluency})`).join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Image 
            src={assets.mah_logo} 
            alt="Mah Logo" 
            width={180} 
            className="w-[130px] sm:w-auto cursor-pointer" 
            onClick={() => router.push('/')}
          />
          <button 
            onClick={() => router.push('/questionnaire')}
            className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 bg-white text-black border border-black shadow-[7px_7px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] transition-all duration-300 ease-in-out'
          >
            Create Profile <Image src={assets.arrow} alt="Arrow" width={12} className='ml-2'/>
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Basic Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              {profile.image ? (
                <Image 
                  src={profile.image} 
                  alt={profile.name} 
                  width={160} 
                  height={160}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-700 to-green-900">
                  <span className="text-5xl font-bold text-white">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-lg text-gray-600 mt-2">
                {profile.age} years • {profile.ethnicity || 'Ethnicity not specified'}
              </p>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Occupation</p>
                  <p className="font-medium">{profile.occupation || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Education</p>
                  <p className="font-medium">{profile.education || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{profile.citizenshipStatus || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* About Me */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">About Me</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {profile.aboutMe || 'No information provided'}
              </p>
            </div>

            {/* Looking For */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">What I'm Looking For</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {profile.lookingForDetails || 'No preferences specified'}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">Personal Details</h2>
              <div className="space-y-3">
                <DetailItem label="Gender" value={profile.gender} />
                <DetailItem label="Marital History" value={profile.maritalHistory} />
                <DetailItem label="Children" value={formatYesNo(profile.children)} />
                <DetailItem label="Willing to Relocate" value={formatYesNo(profile.relocation)} />
                <DetailItem label="Revert" value={formatYesNo(profile.revert)} />
                <DetailItem label="Medical Conditions" value={profile.medicalConditions || 'None specified'} />
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">Languages</h2>
              <p className="text-gray-700">{formatLanguages()}</p>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">Preferences</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {profile.preferences || 'No preferences specified'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable detail component
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ProfilePage;