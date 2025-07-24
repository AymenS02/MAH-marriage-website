// components/questionnaire/MultipleChoice.jsx
import React from 'react';
// This component renders a multiple choice question with options that can be selected.
const MultipleChoice = ({ options, field, title, allowMultiple = false, formData, handleInputChange, handleArrayChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => allowMultiple 
            ? handleArrayChange(field, option)
            : handleInputChange(field, option)
          }
          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
            allowMultiple 
              ? formData[field].includes(option)
                ? 'border-green-800 bg-green-50 text-green-800'
                : 'border-gray-200 bg-white hover:border-green-300'
              : formData[field] === option
                ? 'border-green-800 bg-green-50 text-green-800'
                : 'border-gray-200 bg-white hover:border-green-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default MultipleChoice;