import React, { useState } from 'react';

const References = ({ formData, handleInputChange }) => {
  const [touchedFields, setTouchedFields] = useState({});

  // Initialize references array if empty
  const references = formData.references || [{}, {}];

  const handleFieldBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleReferenceChange = (index, field, value) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    handleInputChange('references', updatedReferences);
  };

  const isFieldValid = (index, field) => {
    return references[index]?.[field]?.trim().length > 0;
  };

  const showError = (index, field) => {
    return touchedFields[`ref${index}${field}`] && !isFieldValid(index, field);
  };

  const renderReferenceSection = (index) => {
    const ref = references[index] || {};
    
    return (
      <div className="bg-gray-50 p-6 rounded-xl mb-6" key={`reference-${index}`}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Reference {index + 1}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ref.name || ''}
              onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
              onBlur={() => handleFieldBlur(`ref${index}name`)}
              className={`w-full p-4 border ${
                showError(index, 'name') ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
              placeholder={`Reference ${index + 1} full name`}
              required
            />
            {showError(index, 'name') && (
              <p className="mt-1 text-sm text-red-600">Please provide the reference's name</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Information <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ref.contact || ''}
              onChange={(e) => handleReferenceChange(index, 'contact', e.target.value)}
              onBlur={() => handleFieldBlur(`ref${index}contact`)}
              className={`w-full p-4 border ${
                showError(index, 'contact') ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
              placeholder={`Email or phone number for reference ${index + 1}`}
              required
            />
            {showError(index, 'contact') && (
              <p className="mt-1 text-sm text-red-600">Please provide contact information</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ref.relationship || ''}
              onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
              onBlur={() => handleFieldBlur(`ref${index}relationship`)}
              className={`w-full p-4 border ${
                showError(index, 'relationship') ? 'border-red-500' : 'border-gray-300'
              } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
              placeholder={`Your relationship with reference ${index + 1}`}
              required
            />
            {showError(index, 'relationship') && (
              <p className="mt-1 text-sm text-red-600">Please describe your relationship</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How long have you known them?
            </label>
            <input
              type="text"
              value={ref.duration || ''}
              onChange={(e) => handleReferenceChange(index, 'duration', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent"
              placeholder={`How long have you known reference ${index + 1}?`}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Character References</h2>
        <p className="text-sm text-gray-600">
          Please provide two references who can vouch for your character and values.
          These should be people who have known you for at least 1 year.
        </p>
      </div>

      {renderReferenceSection(0)}
      {renderReferenceSection(1)}
    </div>
  );
};

export default References;