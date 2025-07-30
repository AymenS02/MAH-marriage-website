'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useQuestionnaireForm } from '@/hooks/useQuestionnaireForm';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';

// Step components
import AccountSetup from './steps/AccountSetup';
import BasicInfo from './steps/BasicInfo';
import Preferences from './steps/Preferences';
import References from './steps/References';
import FreeFormDetails from './steps/FreeFormDetails';

const QuestionnaireWrapper = () => {
  const {
    currentStep,
    formData,
    handleInputChange,
    handleArrayChange,
    nextStep,
    prevStep,
    handleSubmit,
  } = useQuestionnaireForm();

  const [canProceed, setCanProceed] = useState(false);

  const steps = [
    { title: 'Account Setup', component: AccountSetup },
    { title: 'Basic Info', component: BasicInfo },
    { title: 'Preferences', component: Preferences },
    { title: 'References', component: References },
    { title: 'Tell Us More', component: FreeFormDetails },
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name?.trim() && formData.email?.trim() && formData.password?.trim() && formData.phone?.trim();

      case 1:
        const hasValidLanguages =
          formData.languages?.length > 0 &&
          formData.languages.every((lang) => lang.language && lang.fluency);
        return (
          formData.gender?.trim() &&
          formData.age > 0 &&
          formData.ethnicity?.trim() &&
          formData.occupation?.trim() &&
          formData.education?.trim() &&
          hasValidLanguages &&
          formData.citizenshipStatus?.trim() &&
          formData.relocation?.trim() &&
          formData.maritalHistory?.trim() &&
          formData.children?.trim() &&
          formData.revert?.trim() &&
          formData.hijab?.trim() &&
          formData.medicalConditions?.trim()
        );

      case 2: // Preferences
        return formData.preferences?.trim();

      case 3: // References
        return (
          formData.references?.length > 1 &&
          formData.references.every((ref) => ref.name?.trim() && ref.relationship?.trim() && ref.contact?.trim())
        );

      case 4: // Tell Us More (FreeFormDetails)
        return formData.aboutMe?.trim() &&
               formData.lookingForDetails?.trim() &&
               formData.additionalInfo?.trim();

      default:
        return false;
    }
  };

  useEffect(() => {
    // Use central validation for all steps
    setCanProceed(!!isStepValid());
  }, [formData, currentStep]);

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

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep].title}</h2>
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
            isNextDisabled={!canProceed}
            isDoneDisabled={!canProceed}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireWrapper;
