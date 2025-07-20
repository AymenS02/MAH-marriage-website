// components/questionnaire/steps/IslamicPractice.jsx
import React from 'react';
import MultipleChoice from '../MultipleChoice';

const IslamicPractice = ({ formData, handleInputChange, handleArrayChange }) => {
  return (
    <div className="space-y-6">
      <MultipleChoice
        title="Prayer Practice"
        field="prayer"
        options={['5 times daily', 'Mostly consistent', 'Working on consistency', 'Occasionally']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="Hijab/Modest Dress"
        field="modesty"
        options={['Always', 'Most of the time', 'In public only', 'Working towards it', 'Personal choice']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="Halal Diet"
        field="diet"
        options={['Strictly halal', 'Mostly halal', 'Halal meat only', 'Vegetarian', 'Working towards halal']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
    </div>
  );
};

export default IslamicPractice;