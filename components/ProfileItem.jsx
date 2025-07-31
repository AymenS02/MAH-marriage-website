import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ProfileItem = ({ id, name, gender, age, ethnicity, occupation, education, citizenshipStatus, languages, phone }) => {

  return (
    <Link 
      className='min-w-[300px] h-auto bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition-all duration-300 ease-in-out flex flex-col justify-between cursor-pointer'
      href={`/profiles/${id}`}
    >
      <div className='h-full flex flex-col justify-between'>
        {/* Gender Indicator */}
        <p className='pl-5 mt-5 px-1 inline-flex items-center gap-2 text-black text-sm'>
          <span
            className={`w-3 h-3 rounded-full inline-block ${
              gender?.toLowerCase() === 'male' ? 'bg-blue-500' : 'bg-pink-400'
            }`}
          ></span>
          {gender || 'Not specified'}
        </p>

        {/* Main Content */}
        <div className="p-5 flex-grow">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
            {name}, {age}
          </h5>
          
          <p className='mb-3 text-sm tracking-tight text-gray-700 line-clamp-2'>
            Phone #: {phone || 'No phone number available'}
          </p>

          <div className='mb-3 space-y-1 text-sm tracking-tight text-gray-700'>
            <p><b>Ethnicity:</b> {ethnicity || 'Not specified'}</p>
            <p><b>Occupation:</b> {occupation || 'Not specified'}</p>
            <p><b>Education:</b> {education || 'Not specified'}</p>
            <p><b>Status:</b> {citizenshipStatus || 'Not specified'}</p>
            <p><b>Languages:</b> {languages?.map(lang => lang.language).join(', ') || 'None'}</p>
          </div>
        </div>
                
        {/* Read More Button */}
        <div className="px-5 pb-5">
          <span className="inline-flex items-center py-2 font-semibold text-center">
            Read More <Image src={assets.arrow} alt="" width={12} className='ml-2' />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProfileItem