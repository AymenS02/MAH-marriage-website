import React from 'react';
import MultipleChoice from '../MultipleChoice';

const ValuesBeliefs = ({ formData, handleInputChange, handleArrayChange }) => {
  return (
    <div className="space-y-6">
      <MultipleChoice
        title="Religious Commitment"
        field="religiousCommitment"
        options={['Very committed', 'Moderately committed', 'Spiritual but not strict', 'Exploring faith']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="View on Gender Roles"
        field="genderRoles"
        options={['Traditional', 'Flexible traditional', 'Egalitarian', 'Still exploring']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
      
      <MultipleChoice
        title="Approach to Finances"
        field="finances"
        options={['Traditional provider', 'Shared responsibilities', 'Depends on situation', 'Open to discussion']}
        formData={formData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
      />
    </div>
  );
};

export default ValuesBeliefs;