import React from 'react';
import MultipleChoice from '../MultipleChoice';

const LookingFor = ({ formData, handleInputChange, handleArrayChange }) => {
  return (
    <div className="space-y-6">
      <MultipleChoice
        title="Most Important Qualities"
        field="importantQualities"
        options={['Religious commitment', 'Good character', 'Education', 'Family values', 'Compatibility', 'Financial stability']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        multiple={true}
      />
      
      <MultipleChoice
        title="Preferred Age Range"
        field="ageRange"
        options={['Same age', '1-5 years older', '5+ years older', 'Younger', 'Flexible']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="Preferred Level of Education"
        field="educationLevel"
        options={['High school', 'College degree', 'Graduate degree', 'Religious education', 'Not important']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
    </div>
  );
};

export default LookingFor;