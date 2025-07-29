import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ProfileItem = ({ profile }) => {
  const router = useRouter()

  const handleClick = () => {
    console.log('ProfileItem: Clicked profile with ID:', profile?._id);
    console.log('ProfileItem: Full profile data:', profile);
    if (profile?._id) {
      router.push(`/profiles/${profile._id}`)
    } else {
      console.error('ProfileItem: No _id found in profile');
    }
  }

  return (
    <div 
      className='min-w-[300px] h-auto bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition-all duration-300 ease-in-out flex flex-col justify-between cursor-pointer'
      onClick={handleClick}
    >
      <div className='h-full flex flex-col justify-between'>
        {/* Gender Indicator */}
        <p className='pl-5 mt-5 px-1 inline-flex items-center gap-2 text-black text-sm'>
          <span
            className={`w-3 h-3 rounded-full inline-block ${
              profile?.gender?.toLowerCase() === 'male' ? 'bg-blue-500' : 'bg-pink-400'
            }`}
          ></span>
          {profile?.gender || 'Not specified'}
        </p>

        {/* Main Content */}
        <div className="p-5 flex-grow">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
            {profile?.name}, {profile?.age}
          </h5>
          
          <p className='mb-3 text-sm tracking-tight text-gray-700 line-clamp-2'>
            {profile?.aboutMe || 'No description available'}
          </p>

          <div className='mb-3 space-y-1 text-sm tracking-tight text-gray-700'>
            <p><b>Occupation:</b> {profile?.occupation || 'Not specified'}</p>
            <p><b>Education:</b> {profile?.education || 'Not specified'}</p>
            <p><b>Status:</b> {profile?.citizenshipStatus || 'Not specified'}</p>
            <p><b>Languages:</b> {profile?.languages?.map(lang => lang.language).join(', ') || 'None'}</p>
          </div>
        </div>
                
        {/* Read More Button */}
        <div className="px-5 pb-5">
          <span className="inline-flex items-center py-2 font-semibold text-center">
            Read More <Image src={assets.arrow} alt="" width={12} className='ml-2' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileItem