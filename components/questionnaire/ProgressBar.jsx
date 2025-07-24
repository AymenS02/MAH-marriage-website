// components/questionnaire/ProgressBar.jsx
import React from 'react';
import { User, MapPin, Coffee, Heart, Music, Star, Calendar, Book } from 'lucide-react';
// This component renders a progress bar for the questionnaire, showing the current step and overall progress.
const ProgressBar = ({ currentStep }) => {
  const steps = [
    { title: 'Account Setup', icon: User },
    { title: 'Basic Info', icon: MapPin },
    { title: 'Islamic Practice', icon: Coffee },
    { title: 'Values & Beliefs', icon: Heart },
    { title: 'Interests', icon: Music },
    { title: 'Preferences', icon: Star },
    { title: 'Looking For', icon: Calendar },
    { title: 'Tell Us More', icon: Book }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-wrap items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStep 
                  ? 'bg-green-800 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className={`hidden sm:block ml-2 text-sm font-medium ${
                index <= currentStep ? 'text-green-800' : 'text-gray-400'
              }`}>
                {step.title}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-green-800' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-800 to-black h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;