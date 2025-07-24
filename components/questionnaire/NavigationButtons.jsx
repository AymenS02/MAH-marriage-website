import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const NavigationButtons = ({
  currentStep,
  prevStep,
  nextStep,
  handleSubmit,
  isNextDisabled = false // Default to false if not provided
}) => {
  const isLastStep = currentStep === 7;

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
          className="flex items-center px-8 py-3 bg-gradient-to-r from-green-800 to-black text-white rounded-xl font-medium hover:from-green-700 hover:to-gray-800 transition-all shadow-lg"
        >
          <Send className="w-5 h-5 mr-2" />
          Create Profile
        </button>
      ) : (
        <button
          onClick={nextStep}
          disabled={isNextDisabled}
          className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all shadow-lg ${
            isNextDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-800 to-black text-white hover:from-green-700 hover:to-gray-800'
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