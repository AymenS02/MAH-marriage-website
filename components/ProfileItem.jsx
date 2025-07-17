import React from 'react'
import { profile_data, assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'


const ProfileItem = ({gender, name, description, image, age, id}) => {
  return (
    <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition-all duration-300 ease-in-out'>
        <Link href={`/profiles/${id}`}>
            <Image src={image} alt='' width={400} height={400} className='border-b border-black' />
        </Link>
        <p className='ml-5 mt-5 px-1 inline-block bg-white text-black text-sm'>{gender}</p>
        <div className="p-5">
            <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{name}</h5>
            <p className='mb-3 text-sm tracking-tight text-gray-700'>{description}</p>
            <p className='mb-3 text-sm tracking-tight text-gray-700'>Age: {age}</p>
            <Link href={`/profiles/${id}`} className="inline-flex items-center py-2 font-semibold text-center">
                Read More <Image src={assets.arrow} alt="" width={12} className='ml-2'/>
            </Link>
        </div>
    </div>
  )
}

export default ProfileItem