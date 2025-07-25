// components/questionnaire/steps/FreeFormDetails.jsx
import React, { useState } from 'react';

const FreeFormDetails = ({ formData, handleInputChange }) => {
  const [touchedFields, setTouchedFields] = useState({});

  const handleFieldBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const isFieldValid = (field) => {
    return formData[field]?.trim().length > 0;
  };

  const showError = (field) => {
    return touchedFields[field] && !isFieldValid(field);
  };

  const isStepValid = () => {
    const valid = isFieldValid('aboutMe') && 
                  isFieldValid('lookingForDetails') && 
                  isFieldValid('additionalInfo');
    return valid;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About Me <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.aboutMe || ''}
          onChange={(e) => handleInputChange('aboutMe', e.target.value)}
          onBlur={() => handleFieldBlur('aboutMe')}
          rows={4}
          className={`w-full p-4 border ${
            showError('aboutMe') ? 'border-red-500' : 'border-gray-300'
          } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
          placeholder="Tell us about yourself, your personality, interests, and what makes you unique..."
          required
        />
        {showError('aboutMe') && (
          <p className="mt-1 text-sm text-red-600">Please tell us about yourself</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Details About What You're Looking For <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.lookingForDetails || ''}
          onChange={(e) => handleInputChange('lookingForDetails', e.target.value)}
          onBlur={() => handleFieldBlur('lookingForDetails')}
          rows={4}
          className={`w-full p-4 border ${
            showError('lookingForDetails') ? 'border-red-500' : 'border-gray-300'
          } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
          placeholder="Expand on your preferences, describe your ideal partner's character, or share specific hopes for your future together..."
          required
        />
        {showError('lookingForDetails') && (
          <p className="mt-1 text-sm text-red-600">Please describe what you're looking for</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Information <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.additionalInfo || ''}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          onBlur={() => handleFieldBlur('additionalInfo')}
          rows={4}
          className={`w-full p-4 border ${
            showError('additionalInfo') ? 'border-red-500' : 'border-gray-300'
          } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
          placeholder="Anything else you'd like to share? Your goals, dreams, or a message to potential matches..."
          required
        />
        {showError('additionalInfo') && (
          <p className="mt-1 text-sm text-red-600">Please provide additional information</p>
        )}
      </div>
    </div>
  );
};

export default FreeFormDetails;