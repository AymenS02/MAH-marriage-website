import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-green-800 py-5 items-center'>
        <Image src={assets.mah_logo} alt="" width={120} className="w-[130px] sm:w-auto" />
        <p className='text-white text-sm'>© Copyright 2025 | All rights reserved</p>
        <div className="flex">
            <Image src={assets.facebook_icon} alt='Facebook' width={24} className='mx-2 cursor-pointer' />
            <Image src={assets.twitter_icon} alt='Twitter' width={24} className='mx-2 cursor-pointer' />
            <Image src={assets.instagram_icon} alt='Instagram' width={24} className='mx-2 cursor-pointer' />
            <Image src={assets.youtube_icon} alt='YouTube' width={24} className='mx-2 cursor-pointer' />
        </div>
    </div>
  )
}

export default Footer