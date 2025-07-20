// components/questionnaire/steps/BasicInfo.jsx
import React from 'react';
import MultipleChoice from '../MultipleChoice';

const BasicInfo = ({ formData, handleInputChange, handleArrayChange }) => {
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
          'Student', 'Engineer', 'Doctor', 'Teacher', 'House Wife', 'Business Owner',
          'Lawyer', 'Healthcare Worker', 'Finance', 'Technology', 'Imam/Religious Leader', 'Other'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="Education Level"
        field="education"
        options={[
          'High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree',
          'PhD/Doctorate', 'Islamic Studies', 'Hafiz/Hafiza', 'Trade School'
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
    </div>
  );
};

export default BasicInfo;