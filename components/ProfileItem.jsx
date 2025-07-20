import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'

const ProfileItem = ({ gender, name, description, image, age, id, ethnicity, location, education, profession }) => {
  return (
    <div className='min-w-[300px] h-auto bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition-all duration-300 ease-in-out flex flex-col justify-between'>
      <Link href={`/profiles/${id}`} className='h-full flex flex-col justify-between'>
      <p className='pl-5 mt-5 px-1 inline-flex items-center gap-2 text-black text-sm'>
        <span
          className={`w-3 h-3 rounded-full inline-block ${
            gender.toLowerCase() === 'male' ? 'bg-blue-500' : 'bg-pink-400'
          }`}
        ></span>
        {gender}
      </p>
        <div className="p-5 flex-grow">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{name}</h5>
          <p className='mb-3 text-sm tracking-tight text-gray-700 line-clamp-2'>{description}</p>
          <div className='mb-3 space-y-1 text-sm tracking-tight text-gray-700'>
            <p><b>Age:</b> {age}</p>
            <p><b>Ethnicity:</b> {ethnicity}</p>
            <p><b>Location:</b> {location}</p>
            <p><b>Education:</b> {education}</p>
            <p><b>Profession:</b> {profession}</p>
          </div>
        </div>
        <div className="px-5 pb-5">
          <span className="inline-flex items-center py-2 font-semibold text-center">
            Read More <Image src={assets.arrow} alt="" width={12} className='ml-2' />
          </span>
        </div>
      </Link>
    </div>
  )
}

export default ProfileItem
