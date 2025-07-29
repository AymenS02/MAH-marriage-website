// hooks/useQuestionnaireForm.js
'use client'

import { useState } from 'react';

export const useQuestionnaireForm = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({

    // Account Info
    name: '',
    email: '',
    password: '',
    
    // Basic Info
    age: '',
    ethnicity: '',
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

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age), // Ensure age is number
          // No need to manually stringify arrays - JSON.stringify does it automatically
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Profile created successfully! 💕');
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Failed to create profile: ${error.message}`);
    }
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