import React, { useState } from 'react';

const Preferences = ({ formData, handleInputChange }) => {
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
    return isFieldValid('preferences');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are you looking for in a partner? <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.preferences || ''}
          onChange={(e) => handleInputChange('preferences', e.target.value)}
          onBlur={() => handleFieldBlur('preferences')}
          rows={12}
          className={`w-full p-4 border ${
            showError('preferences') ? 'border-red-500' : 'border-gray-300'
          } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
          placeholder="Share your preferences here. Please describe your ideal partner's qualities, values, and any specific characteristics you're looking for..."
          required
        />
        {showError('preferences') && (
          <p className="mt-1 text-sm text-red-600">Please share your preferences</p>
        )}
      </div>
    </div>
  );
};

export default Preferences;