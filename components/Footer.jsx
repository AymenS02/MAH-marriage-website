import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-black text-white py-12 px-5 md:px-12 lg:px-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-green-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Muslim Matrimonial</span>
              </div>
              <p className="text-gray-400">
                Connecting hearts through faith, guided by Islamic principles and community values.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => window.open("https://www.mahcanada.com/about-us", "_blank")} className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a onClick={() => window.open("https://www.mahcanada.com/contact-us", "_blank")} className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@muslimmatrimonial.com</p>
                <p>📱 +1 (905) -929 -1526</p>
                <p>📍 1545 Stone Church Rd E, Hamilton, ON L8W 3P8</p>
                {/* <p className="cursor-pointer" onClick={() => window.open("https://www.mahcanada.com", "_blank")}>🌐 www.mahcanada.com</p> */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 All rights reserved. | Guided by Islamic principles</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer