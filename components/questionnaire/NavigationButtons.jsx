import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const NavigationButtons = ({
  currentStep,
  prevStep,
  nextStep,
  handleSubmit,
  isNextDisabled = false, // Default to false if not provided
  isDoneDisabled = false
}) => {
  const isLastStep = currentStep === 4;

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={prevStep}
        disabled={currentStep === 0}
        className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
          currentStep === 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Previous
      </button>

      {isLastStep ? (
        <button
          onClick={handleSubmit}
          disabled={isDoneDisabled}
          className={`flex items-center px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 ease-in-out ${
            isDoneDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-800 text-white hover:bg-green-700'
          }`}
        >
          <Send className="w-5 h-5 mr-2" />
          Create Profile
        </button>
      ) : (
        <button
          onClick={nextStep}
          disabled={isNextDisabled}
          className={`flex items-center px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 ease-in-out ${
            isNextDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-800 text-white hover:bg-green-700'
          }`}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;