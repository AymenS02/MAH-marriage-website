// components/questionnaire/steps/FreeFormDetails.jsx
import React from 'react';

const FreeFormDetails = ({ formData, handleInputChange }) => {
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
};

export default FreeFormDetails;