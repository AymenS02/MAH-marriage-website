import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const Header = () => {

  const router = useRouter();
  
  const handleBeginApplication = () => {
    router.push('/application');
  };

  return (
    <>
      {/* Header */}
      <header className="hidden lg:block bg-gradient-to-br from-green-800 to-green-600 text-black py-5 px-5 md:px-12 lg:px-28 backdrop-blur-sm sticky top-0 z-50 border-green-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div onClick={() => router.push('/')} className="rounded-full flex items-center justify-center">
                <Image src={assets.mah_logo} alt='' width={200} height={400} className='' />
            </div>
          </div>
          <button 
            onClick={handleBeginApplication}
            className="flex items-center gap-2 py-2 px-4 sm:py-3 sm:px-6 bg-white text-green-800 font-medium rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-green-900/25 border border-transparent hover:border-green-200"
          >
            Login/Register <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>
    </>
  )
}

export default Header