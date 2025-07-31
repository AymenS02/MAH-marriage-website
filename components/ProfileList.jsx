'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileItem from './ProfileItem'

const ProfileList = () => {
  const [menu, setMenu] = useState('All')
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/profile')
        if (!response.ok) throw new Error('Failed to fetch profiles')
        const data = await response.json()
        setProfiles(data)
      } catch (error) {
        console.error('Error fetching profiles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  const filteredData = profiles.filter((profile) => {
    if (menu === "All") return true
    if (menu === "GreaterThan25") return profile.age >= 25
    if (menu === "LessThan25") return profile.age <= 25
    if (menu === "LessThan22") return profile.age <= 22
    return true
  })

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
    </div>
  )

  if (!loading && profiles.length === 0) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-gray-200">No profiles found</h2>
      <p className="text-gray-300 mt-2">Check back later or create a new profile</p>
      <button 
        onClick={() => router.push('/application')}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Create First Profile
      </button>
    </div>
  )

  return (
    <div className='bg-white py-5 md:px-20'>
      {/* Filter buttons */}
      <div className="flex justify-center gap-10 py-10">
        <button 
          onClick={() => setMenu('All')} 
          className={menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          All
        </button>
        <button 
          onClick={() => setMenu('GreaterThan25')} 
          className={menu === "GreaterThan25" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          &gt; 25
        </button>
        <button 
          onClick={() => setMenu('LessThan25')} 
          className={menu === "LessThan25" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          &lt; 25
        </button>
        <button 
          onClick={() => setMenu('LessThan22')} 
          className={menu === "LessThan22" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          &lt; 22
        </button>
      </div>
      
      {/* Profile grid */}
      <div className="flex flex-wrap justify-center gap-20 gap-y-10 mb-16 xl:mx-24">
        {filteredData.map((profile) => (
          <ProfileItem
            key={profile._id}
            id={profile._id}
            name={profile.name}
            age={profile.age}
            gender={profile.gender}
            ethnicity={profile.ethnicity}
            occupation={profile.occupation}
            education={profile.education}
            citizenshipStatus={profile.citizenshipStatus}
            languages={profile.languages}
            phone={profile.phone}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileList