// components/questionnaire/QuestionnaireWrapper.jsx
'use client'

import React from 'react';
import { Heart } from 'lucide-react';
import { useQuestionnaireForm } from '@/hooks/useQuestionnaireForm';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';

// Import step components
import AccountSetup from './steps/AccountSetup';
import BasicInfo from './steps/BasicInfo';
import IslamicPractice from './steps/IslamicPractice';
import ValuesBeliefs from './steps/ValuesBeliefs';
import Interests from './steps/Interests';
import Preferences from './steps/Preferences';
import LookingFor from './steps/LookingFor';
import FreeFormDetails from './steps/FreeFormDetails';

const QuestionnaireWrapper = () => {
  const {
    currentStep,
    formData,
    handleInputChange,
    handleArrayChange,
    nextStep,
    prevStep,
    handleSubmit
  } = useQuestionnaireForm();

  const steps = [
    { title: 'Account Setup', component: AccountSetup },
    { title: 'Basic Info', component: BasicInfo },
    { title: 'Islamic Practice', component: IslamicPractice },
    { title: 'Values & Beliefs', component: ValuesBeliefs },
    { title: 'Interests', component: Interests },
    { title: 'Preferences', component: Preferences },
    { title: 'Looking For', component: LookingFor },
    { title: 'Tell Us More', component: FreeFormDetails }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-green-800 mr-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-black bg-clip-text text-transparent">
              Find Your Match
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your profile to find a practicing Muslim spouse who shares your values and interests.
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>

            <CurrentStepComponent
              formData={formData}
              handleInputChange={handleInputChange}
              handleArrayChange={handleArrayChange}
            />
          </div>

          {/* Navigation */}
          <NavigationButtons
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireWrapper;