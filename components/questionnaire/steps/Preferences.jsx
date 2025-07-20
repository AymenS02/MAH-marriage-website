import React from 'react';
import MultipleChoice from '../MultipleChoice';

const Preferences = ({ formData, handleInputChange, handleArrayChange }) => {
  return (
    <div className="space-y-6">
      <MultipleChoice
        title="Preferred Marriage Timeline"
        field="marriageTimeline"
        options={['Within 6 months', '1 year', '2 years', 'When Allah wills', 'No specific timeline']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="Living Arrangement Preference"
        field="livingArrangement"
        options={['Live with family', 'Separate home', 'Flexible', 'Depends on situation']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="Children Preference"
        field="children"
        options={['Want children', 'Open to children', 'Prefer no children', 'Will decide later']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
    </div>
  );
};

export default Preferences;