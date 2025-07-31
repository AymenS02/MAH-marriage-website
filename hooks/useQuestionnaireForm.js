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
    phone: '',

    // Basic Info
    gender: '',
    age: 0,
    ethnicity: '',
    occupation: '',
    education: '',
    languages: [], // Array of { language: string, fluency: string }
    citizenshipStatus: '',
    relocation: '',
    maritalHistory: '',
    children: '',
    revert: '',
    hijab: '', // New field for hijab preference
    medicalConditions: '',

    // Preferences
    preferences: '',

    // References
    references: [], // Array of { name: string, relationship: string, contact: string }

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

  const handleArrayChange = (field, value, index = null, subField = null) => {
    setFormData(prev => {
      // For nested objects in arrays (like languages or references)
      if (index !== null && subField) {
        const updatedArray = [...prev[field]];
        updatedArray[index] = {
          ...updatedArray[index],
          [subField]: value
        };
        return {
          ...prev,
          [field]: updatedArray
        };
      }
      
      // For simple arrays (toggle behavior)
      return {
        ...prev,
        [field]: prev[field].includes(value) 
          ? prev[field].filter(item => item !== value)
          : [...prev[field], value]
      };
    });
  };

  const addArrayItem = (field, initialValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], initialValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) { // Updated to match 5 steps (0-4)
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
      console.log('Submitting form data:', formData); // Debug log
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    setFormData,
    handleInputChange,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    nextStep,
    prevStep,
    handleSubmit
  };
};