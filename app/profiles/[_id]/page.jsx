'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'

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

  // Format helpers
  const formatYesNo = (value) => {
    if (!value) return 'Not specified'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return value // handles 'Yes', 'No', 'Other'
  }

  const formatLanguages = () => {
    if (!profile.languages?.length) return 'None specified'
    return profile.languages.map((lang) => `${lang.language} (${lang.fluency})`).join(', ')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            {profile.age} years • {profile.ethnicity || 'Ethnicity not specified'}
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <DetailItem label="Email" value={profile.email} />
            <DetailItem label="Phone" value={profile.phone} />
            <DetailItem label="Occupation" value={profile.occupation} />
            <DetailItem label="Education" value={profile.education} />
            <DetailItem label="Citizenship Status" value={profile.citizenshipStatus} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <Section title="About Me" content={profile.aboutMe} />
            <Section title="What I'm Looking For" content={profile.lookingForDetails} />
            <Section title="Additional Information" content={profile.additionalInfo} />
            <Section title="Preferences" content={profile.preferences} />

            {/* References */}
            {profile.references?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">
                  References
                </h2>
                <ul className="space-y-3">
                  {profile.references.map((ref, idx) => (
                    <li key={idx} className="border rounded-lg p-3">
                      <p><strong>Name:</strong> {ref.name}</p>
                      <p><strong>Contact:</strong> {ref.contact}</p>
                      <p><strong>Relationship:</strong> {ref.relationship}</p>
                      {ref.duration && <p><strong>Duration:</strong> {ref.duration}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                <DetailItem label="Hijab Preference" value={profile.hijab} />
                <DetailItem label="Revert" value={formatYesNo(profile.revert)} />
                <DetailItem label="Medical Conditions" value={profile.medicalConditions} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800 border-b pb-2">Languages</h2>
              <p className="text-gray-700">{formatLanguages()}</p>
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
