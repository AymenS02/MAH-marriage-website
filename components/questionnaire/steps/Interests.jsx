import React from 'react';
import MultipleChoice from '../MultipleChoice';

const Interests = ({ formData, handleInputChange, handleArrayChange }) => {
  return (
    <div className="space-y-6">
      <MultipleChoice
        title="Hobbies & Interests"
        field="hobbies"
        options={['Reading', 'Sports', 'Travel', 'Cooking', 'Arts & Crafts', 'Technology', 'Volunteering']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        multiple={true}
      />
      
      <MultipleChoice
        title="Preferred Leisure Activities"
        field="leisure"
        options={['Outdoor activities', 'Quiet time at home', 'Social gatherings', 'Cultural events', 'Religious activities']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        multiple={true}
      />
    </div>
  );
};

export default Interests;