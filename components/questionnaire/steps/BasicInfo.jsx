import React, { useState } from 'react';
import MultipleChoice from '../MultipleChoice';
import countries from './utils/countries';
import languages from './utils/languages';
import fluencyLevels from './utils/fluencyLevels';

const BasicInfo = ({ formData, handleInputChange, handleArrayChange }) => {
  const [selectedLanguages, setSelectedLanguages] = useState(formData.languages || []);
  const [touchedFields, setTouchedFields] = useState({});

  const handleAddLanguage = () => {
    const updated = [...selectedLanguages, { language: '', fluency: '' }];
    setSelectedLanguages(updated);
    handleInputChange('languages', updated);
  };

  const handleLanguageChange = (index, field, value) => {
    const updated = [...selectedLanguages];
    updated[index][field] = value;
    setSelectedLanguages(updated);
    handleInputChange('languages', updated);
  };

  const handleRemoveLanguage = (index) => {
    const updated = selectedLanguages.filter((_, i) => i !== index);
    setSelectedLanguages(updated);
    handleInputChange('languages', updated);
  };

  const handleFieldBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const isFieldValid = (field) => {
    if (field === 'languages') {
      return formData.languages?.length > 0 && 
             formData.languages.every(lang => lang.language && lang.fluency);
    }
    return !!formData[field];
  };

  const showError = (field) => {
    return touchedFields[field] && !isFieldValid(field);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
        
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            onBlur={() => handleFieldBlur('age')}
            className={`w-full p-4 border ${
              showError('age') ? 'border-red-500' : 'border-gray-300'
            } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
            placeholder="25"
            required
          />
          {showError('age') && (
            <p className="mt-1 text-sm text-red-600">Please enter your age</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ethnicity</label>
          <select
            value={formData.ethnicity}
            onChange={(e) => handleInputChange('ethnicity', e.target.value)}
            onBlur={() => handleFieldBlur('ethnicity')}
            className={`w-full p-4 border ${
              showError('ethnicity') ? 'border-red-500' : 'border-gray-300'
            } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
            required
          >
            <option value="">Select your ethnicity</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {showError('ethnicity') && (
            <p className="mt-1 text-sm text-red-600">Please select your ethnicity</p>
          )}
        </div>
      </div>
      
      <MultipleChoice
        title="What's your gender?"
        field="gender"
        options={[
          'Male', 'Female'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('gender')}
      />

      <MultipleChoice
        title="What's your occupation?"
        field="occupation"
        options={[
          'Student', 'Engineer', 'Doctor', 'Teacher', 'Business Owner',
          'Lawyer', 'Healthcare Worker', 'Finance', 'Technology', 'Imam/Religious Leader', 'Other', 'No Occupation'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('occupation')}
      />

      <MultipleChoice
        title="Education Level"
        field="education"
        options={[
          'High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree',
          'PhD/Doctorate', 'Islamic Studies', 'Trade School', 'None', 'Other (please mention in extra info later)'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('education')}
      />

      <MultipleChoice
        title="Citizenship Status in Canada"
        field="citizenshipStatus"
        options={[
          'Canadian Citizen', 'Permanent Resident', 'Visa (work/study/tourist/etc)', 'Other (please mention in extra info later)'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('citizenshipStatus')}
      />

      <MultipleChoice
        title="What is your marital history?"
        field="maritalHistory"
        options={[
          'Not Applicable', 'Married', 'Divorced', 'Previously Engaged', 'Other (please mention in extra info later)'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('maritalHistory')}
      />

      <MultipleChoice
        title="Do you have any children?"
        field="children"
        options={[
          'Yes', 'No', 'Other (please mention in extra info later)'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('children')}
      />

      <MultipleChoice
        title="Are you open to relocating?"
        field="relocation"
        options={[
          'Yes', 'No'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('relocation')}
      />

      <MultipleChoice
        title="Are you a revert?"
        field="revert"
        options={[
          'Yes', 'No'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('revert')}
      />

      <MultipleChoice
        title="Do you have any medical conditions a spouse should be aware of?"
        field="medicalConditions"
        options={[
          'Yes', 'No'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        required
        showError={showError('medicalConditions')}
      />

      {/* Language Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          What languages can you speak?
          <span className="block text-sm text-gray-500">
            Please describe fluency level as well.
          </span>
        </label>

        {selectedLanguages.length === 0 && touchedFields.languages && (
          <p className="text-sm text-red-600">Please add at least one language</p>
        )}

        {selectedLanguages.map((entry, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm">Language</label>
              <select
                value={entry.language}
                onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                onBlur={() => handleFieldBlur('languages')}
                className={`w-full p-4 border ${
                  !entry.language && touchedFields.languages ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
                required
              >
                <option value="">Select a language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm">Fluency</label>
              <select
                value={entry.fluency}
                onChange={(e) => handleLanguageChange(index, 'fluency', e.target.value)}
                onBlur={() => handleFieldBlur('languages')}
                className={`w-full p-4 border ${
                  !entry.fluency && touchedFields.languages ? 'border-red-500' : 'border-gray-300'
                } rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent`}
                required
              >
                <option value="">Select fluency level</option>
                {fluencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleRemoveLanguage(index)}
              className="text-red-600 hover:underline text-sm mt-2 md:mt-0"
              type="button"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            handleAddLanguage();
            handleFieldBlur('languages');
          }}
          className="mt-2 text-green-700 hover:underline text-sm"
          type="button"
        >
          + Add Language
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;