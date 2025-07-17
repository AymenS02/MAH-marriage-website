'use client'
import { profile_data, assets } from '@/assets/assets';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

const page = ({ params }) => {

  const [profile, setProfile] = useState(null);

  const fetchProfileData = () => {
    try {
      for (let i = 0; i < profile_data.length; i++) {
        if (Number(params.id) === profile_data[i].id) {
          setProfile(profile_data[i]);
          break;
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    profile ? <>
      <div className="bg-green-800 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center" >
          <Image src={assets.mah_logo} alt="Mah Logo" width={180} className="w-[130px] sm:w-auto" />
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[7px_7px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] transition-all duration-300 ease-in-out'>Get Started <Image src={assets.arrow} alt="Arrow" width={12} className='ml-2'/></button>
        </div>
      </div>
      <div className="text-center my-24">
        <h1 className="text-2xl sm:text-5xl font-semibold mas-w-[700px] mx-auto">{profile.name}</h1>
      </div>
    </>:<p>Loading...</p>
  )
}

export default page