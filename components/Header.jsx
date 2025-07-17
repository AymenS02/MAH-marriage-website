import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useRouter } from 'next/navigation';

const Header = () => {

  const router = useRouter();

  const handleClick = () => {
    router.push('/application');
  };

  return (
    <div className='text-white py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
            <Image src={assets.mah_logo} alt="" width={180} className="w-[130px] sm:w-auto" />
            <button onClick={handleClick} className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} alt="" width={16}/></button>
        </div>
        <div className="text-center my-8">
            <h1 className='text-3xl sm:text-5xl font-medium'>Latest Entries</h1>
            <p className="mt-10 max-w-[740px] m-auto text-xs  sm:text-base">asdjnasdkfjnskfjn</p>
            <form className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]">
                <input type="email" placeholder='Enter your email' className='pl-4 outline-none' />
                <button type="submit" className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-00 active:text-white'>Subscribe</button>
            </form>                                  
        </div>
    </div>
  )
}

export default Header