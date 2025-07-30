'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useRouter } from 'next/navigation'

export default function ProfilePage({ params }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!params._id) return
        const res = await fetch(`/api/profile/${params._id}`)
        if (!res.ok) throw new Error('Profile not found')
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [params._id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">Error: {error}</h2>
        <button
          onClick={() => router.push('/admin')}
          className="mt-4 bg-green-600 border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Return To Admin Page
        </button>
      </div>
    )
  }

  // Helpers
  const formatYesNo = (value) =>
    value === true ? 'Yes' : value === false ? 'No' : value || 'Not specified'

  const formatLanguages = () => {
    if (!profile.languages?.length) return 'None specified'
    return profile.languages.map((lang) => `${lang.language} (${lang.fluency})`).join(', ')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Image
            src={assets.mah_logo}
            alt="Mah Logo"
            width={180}
            className="w-[130px] sm:w-auto cursor-pointer"
            onClick={() => router.push('/')}
          />
          <button
            onClick={() => router.push('/questionnaire')}
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 bg-white text-black border border-black shadow-[7px_7px_0px_#000000] hover:shadow-[5px_5px_0px_#000000] transition-all duration-300 ease-in-out"
          >
            Create Profile{' '}
            <Image src={assets.arrow} alt="Arrow" width={12} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-lg text-gray-600 mt-2">
              {profile.age} years • {profile.ethnicity || 'Ethnicity not specified'}
            </p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailItem label="Occupation" value={profile.occupation} />
              <DetailItem label="Education" value={profile.education} />
              <DetailItem label="Status" value={profile.citizenshipStatus} />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <Section title="About Me" content={profile.aboutMe} />
            <Section title="What I'm Looking For" content={profile.lookingForDetails} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">
                Personal Details
              </h2>
              <div className="space-y-3">
                <DetailItem label="Gender" value={profile.gender} />
                <DetailItem label="Marital History" value={profile.maritalHistory} />
                <DetailItem label="Children" value={formatYesNo(profile.children)} />
                <DetailItem label="Willing to Relocate" value={formatYesNo(profile.relocation)} />
                <DetailItem label="Revert" value={formatYesNo(profile.revert)} />
                <DetailItem
                  label="Medical Conditions"
                  value={profile.medicalConditions || 'None specified'}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">Languages</h2>
              <p className="text-gray-700">{formatLanguages()}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">Preferences</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {profile.preferences || 'No preferences specified'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || 'Not specified'}</p>
  </div>
)

const Section = ({ title, content }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">{title}</h2>
    <p className="text-gray-700 whitespace-pre-line">{content || 'No information provided'}</p>
  </div>
)
