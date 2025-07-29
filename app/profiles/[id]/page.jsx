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
        const response = await fetch(`/api/profile/${params.id}`);
        if (!response.ok) {
          throw new Error('Profile not found');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [params.id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-red-600">Error: {error}</h2>
      <button 
        onClick={() => router.push('/')}
        className="mt-4 bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Return Home
      </button>
    </div>
  );

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
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[7px_7px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] transition-all duration-300 ease-in-out'>
            Get Started <Image src={assets.arrow} alt="Arrow" width={12} className='ml-2'/>
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Basic Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
              {/* Replace with actual image if available */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <span className="text-4xl font-bold text-gray-600">
                  {profile.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{profile.age} years • {profile.ethnicity}</p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {profile.gender}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {profile.occupation}
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {profile.education}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About Me */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-800">About Me</h2>
            <p className="text-gray-700">{profile.aboutMe}</p>
          </div>

          {/* Looking For */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Looking For</h2>
            <p className="text-gray-700">{profile.lookingForDetails}</p>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Personal Details</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Location:</span> {profile.ethnicity}</p>
              <p><span className="font-medium">Marital History:</span> {profile.maritalHistory}</p>
              <p><span className="font-medium">Children:</span> {profile.children}</p>
              <p><span className="font-medium">Willing to Relocate:</span> {profile.relocation}</p>
              <p><span className="font-medium">Revert:</span> {profile.revert}</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Preferences</h2>
            <p className="text-gray-700">{profile.preferences}</p>
          </div>
        </div>

        {/* Languages */}
        {profile.languages?.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang, index) => (
                <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  {lang.language} ({lang.fluency})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;