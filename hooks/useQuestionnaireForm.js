// hooks/useQuestionnaireForm.js
'use client'

import { useState } from 'react';
// Ask Do you have any genetic medical conditions?
// Do you follow a madhab?
// Questions about looks?
export const useQuestionnaireForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({

    // Account Info
    name: '',
    email: '',
    password: '',
    
    // Basic Info
    age: '',
    location: '',
    occupation: '',
    education: '',
    
    // Islamic Practice
    prayer: '',
    modesty: '',
    diet: '',
    
    // Personality & Values
    personality: '',
    islamicKnowledge: '',
    madhab: '',
    familyPlans: '',
    
    // Interests
    hobbies: [],
    islamicActivities: [],
    entertainment: '',
    travelStyle: '',
    
    // Relationship Preferences
    relationshipType: '',
    idealDate: '',
    spouseQualities: [],
    dealBreakers: [],
    
    // Looking for (multiple choice)
    lookingForAge: '',
    lookingForEducation: '',
    lookingForOccupation: '',
    lookingForLocation: '',
    lookingForPracticeLevel: '',
    
    // Free form details
    aboutMe: '',
    lookingForDetails: '',
    additionalInfo: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { ...formData });
    alert('Profile created successfully! 💕');
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    handleArrayChange,
    nextStep,
    prevStep,
    handleSubmit
  };
};