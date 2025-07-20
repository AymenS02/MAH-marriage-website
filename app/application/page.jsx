'use client'

import React, { useState } from 'react';
import { Camera, Heart, User, Mail, Lock, MapPin, Calendar, Book, Coffee, Star, Music, Dumbbell, ChevronRight, ChevronLeft, Send } from 'lucide-react';

const SpouseFinderQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Account Info
    name: '',
    email: '',
    password: '',
    
    // Basic Info
    age: '',
    location: '',
    occupation: '',
    education: '',
    
    // Islamic Practice
    prayer: '',
    modesty: '',
    diet: '',
    
    // Personality & Values
    personality: '',
    islamicKnowledge: '',
    madhab: '',
    familyPlans: '',
    
    // Interests
    hobbies: [],
    islamicActivities: [],
    entertainment: '',
    travelStyle: '',
    
    // Relationship Preferences
    relationshipType: '',
    idealDate: '',
    spouseQualities: [],
    dealBreakers: [],
    
    // Looking for (multiple choice)
    lookingForAge: '',
    lookingForEducation: '',
    lookingForOccupation: '',
    lookingForLocation: '',
    lookingForPracticeLevel: '',
    
    // Free form details
    aboutMe: '',
    lookingForDetails: '',
    additionalInfo: ''
  });

  const steps = [
    { title: 'Account Setup', icon: User },
    { title: 'Basic Info', icon: MapPin },
    { title: 'Islamic Practice', icon: Coffee },
    { title: 'Values & Beliefs', icon: Heart },
    { title: 'Interests', icon: Music },
    { title: 'Preferences', icon: Star },
    { title: 'Looking For', icon: Calendar },
    { title: 'Tell Us More', icon: Book }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { ...formData });
    alert('Profile created successfully! 💕');
  };

  const MultipleChoice = ({ options, field, title, allowMultiple = false }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => allowMultiple 
              ? handleArrayChange(field, option)
              : handleInputChange(field, option)
            }
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              allowMultiple 
                ? formData[field].includes(option)
                  ? 'border-green-800 bg-green-50 text-green-800'
                  : 'border-gray-200 bg-white hover:border-green-300'
                : formData[field] === option
                  ? 'border-green-800 bg-green-50 text-green-800'
                  : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Account Setup
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                  placeholder="Create a secure password"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Basic Info
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                  placeholder="25"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                  placeholder="New York, NY"
                />
              </div>
            </div>
            
            <MultipleChoice
              title="What's your occupation?"
              field="occupation"
              options={[
                'Student', 'Engineer', 'Doctor', 'Teacher', 'Islamic Scholar', 'Business Owner',
                'Lawyer', 'Healthcare Worker', 'Finance', 'Technology', 'Imam/Religious Leader', 'Other'
              ]}
            />
            
            <MultipleChoice
              title="Education Level"
              field="education"
              options={[
                'High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree',
                'PhD/Doctorate', 'Islamic Studies', 'Hafiz/Hafiza', 'Trade School'
              ]}
            />
          </div>
        );

      case 2: // Islamic Practice
        return (
          <div className="space-y-6">
            <MultipleChoice
              title="Prayer Practice"
              field="prayer"
              options={['5 times daily', 'Mostly consistent', 'Working on consistency', 'Occasionally']}
            />
            
            <MultipleChoice
              title="Hijab/Modest Dress"
              field="modesty"
              options={['Always', 'Most of the time', 'In public only', 'Working towards it', 'Personal choice']}
            />
            
            <MultipleChoice
              title="Halal Diet"
              field="diet"
              options={['Strictly halal', 'Mostly halal', 'Halal meat only', 'Vegetarian', 'Working towards halal']}
            />
          </div>
        );

      case 3: // Values & Beliefs
        return (
          <div className="space-y-6">
            <MultipleChoice
              title="Personality Type"
              field="personality"
              options={[
                'Extrovert', 'Introvert', 'Ambivert', 'Optimist', 'Calm & Patient',
                'Creative', 'Analytical', 'Spontaneous', 'Organized'
              ]}
            />
            
            <MultipleChoice
              title="Islamic Knowledge Level"
              field="islamicKnowledge"
              options={[
                'Beginner', 'Intermediate', 'Advanced', 'Islamic Studies Graduate',
                'Self-taught', 'Continuously Learning', 'Hafiz/Hafiza'
              ]}
            />
            
            <MultipleChoice
              title="Madhab (School of Thought)"
              field="madhab"
              options={[
                'Hanafi', 'Shafi\'i', 'Maliki', 'Hanbali', 'No specific madhab', 'Still learning'
              ]}
            />
            
            <MultipleChoice
              title="Family Plans"
              field="familyPlans"
              options={[
                'Want children soon', 'Want children eventually', 'Open to Allah\'s will',
                'Have children', 'Undecided', 'Focus on career first'
              ]}
            />
          </div>
        );

      case 4: // Interests
        return (
          <div className="space-y-6">
            <MultipleChoice
              title="Hobbies & Interests (Select all that apply)"
              field="hobbies"
              allowMultiple={true}
              options={[
                'Reading Quran', 'Islamic Studies', 'Reading', 'Travel', 'Cooking', 'Sports',
                'Calligraphy', 'Learning Languages', 'Photography', 'Hiking', 'Writing',
                'Gardening', 'Volunteering', 'Community Service', 'Fitness', 'Arts & Crafts'
              ]}
            />
            
            <MultipleChoice
              title="Favorite Islamic Activities"
              field="islamicActivities"
              allowMultiple={true}
              options={[
                'Attending Islamic lectures', 'Quran recitation', 'Dhikr gatherings', 'Charity work',
                'Islamic book clubs', 'Mosque activities', 'Umrah/Hajj', 'Teaching Islamic studies',
                'Community outreach', 'Islamic conferences'
              ]}
            />
            
            <MultipleChoice
              title="Preferred Entertainment"
              field="entertainment"
              options={[
                'Islamic documentaries', 'Halal comedy', 'Educational content', 'Nature shows',
                'Historical films', 'Family-friendly movies', 'Minimal entertainment', 'Books over screen time'
              ]}
            />
            
            <MultipleChoice
              title="Travel Style"
              field="travelStyle"
              options={[
                'Islamic historical sites', 'Halal-friendly destinations', 'Family trips',
                'Educational travel', 'Nature & outdoors', 'Cultural exploration', 'Prefer staying home'
              ]}
            />
          </div>
        );

      case 5: // Preferences
        return (
          <div className="space-y-6">
            <MultipleChoice
              title="Seeking Marriage For"
              field="relationshipType"
              options={[
                'Completing half my deen', 'Life partnership', 'Building Islamic family',
                'Companionship in faith', 'Growing together spiritually', 'Support in worldly & religious matters'
              ]}
            />
            
            <MultipleChoice
              title="Ideal First Meeting"
              field="idealDate"
              options={[
                'Family gathering', 'Islamic event/lecture', 'Mosque introduction', 'Halal restaurant',
                'Community service', 'Islamic bookstore/library', 'Park with family present', 'Video call first'
              ]}
            />
            
            <MultipleChoice
              title="Important Qualities in Spouse (Select all that apply)"
              field="spouseQualities"
              allowMultiple={true}
              options={[
                'Strong in deen', 'Good character (akhlaq)', 'Family-oriented', 'Respectful',
                'Supportive', 'Good communicator', 'Financially responsible', 'Kind to parents',
                'Patient', 'Honest', 'Ambitious', 'Sense of humor', 'Educated', 'Health-conscious'
              ]}
            />
            
            <MultipleChoice
              title="Deal Breakers (Select all that apply)"
              field="dealBreakers"
              allowMultiple={true}
              options={[
                'Not practicing Islam', 'Disrespectful to parents', 'Dishonesty', 'Bad character',
                'Different sect', 'Smoking', 'Not following halal', 'Excessive social media',
                'Materialistic', 'Not wanting children', 'Long distance', 'Different life goals'
              ]}
            />
          </div>
        );
        
      case 6: // Looking For
        return (
          <div className="space-y-6">
            <MultipleChoice
              title="Preferred Age Range"
              field="lookingForAge"
              options={[
                '18-25', '25-30', '30-35', '35-40', '40-45', '45+', 'Age is just a number'
              ]}
            />
            
            <MultipleChoice
              title="Preferred Education Level"
              field="lookingForEducation"
              options={[
                'High School', 'Bachelor\'s Degree', 'Master\'s+', 'Islamic Studies', 
                'Hafiz/Hafiza', 'Education not important', 'Similar to mine'
              ]}
            />
            
            <MultipleChoice
              title="Preferred Occupation Type"
              field="lookingForOccupation"
              options={[
                'Professional', 'Healthcare', 'Education', 'Islamic field', 'Business',
                'Technology', 'Any halal work', 'Homemaker', 'Flexible'
              ]}
            />
            
            <MultipleChoice
              title="Location Preference"
              field="lookingForLocation"
              options={[
                'Same city', 'Same country', 'Willing to relocate', 'Long distance OK',
                'Must be local', 'Open to anywhere'
              ]}
            />
            
            <MultipleChoice
              title="Islamic Practice Level"
              field="lookingForPracticeLevel"
              options={[
                'Very practicing', 'Moderately practicing', 'Growing in faith',
                'Similar to mine', 'More practicing than me', 'Level not important'
              ]}
            />
          </div>
        );
      case 7: // Free Form Details
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
              <textarea
                value={formData.aboutMe}
                onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="Tell us about yourself, your personality, interests, and what makes you unique..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details About What You're Looking For</label>
              <textarea
                value={formData.lookingForDetails}
                onChange={(e) => handleInputChange('lookingForDetails', e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="Expand on your preferences, describe your ideal partner's character, or share specific hopes for your future together..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
                placeholder="Anything else you'd like to share? Your goals, dreams, or a message to potential matches..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-green-800 mr-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-black bg-clip-text text-transparent">
              Find Your Match
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your profile to find a practicing Muslim spouse who shares your values and interests.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-wrap items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStep 
                      ? 'bg-green-800 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`hidden sm:block ml-2 text-sm font-medium ${
                    index <= currentStep ? 'text-green-800' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      index < currentStep ? 'bg-green-800' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-800 to-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>

            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-800 to-black text-white rounded-xl font-medium hover:from-green-700 hover:to-gray-800 transition-all shadow-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Create Profile
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-800 to-black text-white rounded-xl font-medium hover:from-green-700 hover:to-gray-800 transition-all shadow-lg"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpouseFinderQuestionnaire;