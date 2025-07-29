import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  // Account Setup
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  // Basic Info
  age: {
    type: Number,
    required: true
  },
//   ethnicity: {
//     type: String,
//     required: true
//   },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  occupation: {
    type: String,
    enum: [
      'Student', 'Engineer', 'Doctor', 'Teacher', 'Business Owner',
      'Lawyer', 'Healthcare Worker', 'Finance', 'Technology', 
      'Imam/Religious Leader', 'Other', 'No Occupation'
    ],
    required: true
  },
  education: {
    type: String,
    enum: [
      'High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree',
      'PhD/Doctorate', 'Islamic Studies', 'Trade School', 'None', 
      'Other (please mention in extra info later)'
    ],
    required: true
  },
  citizenshipStatus: {
    type: String,
    enum: [
      'Canadian Citizen', 'Permanent Resident', 
      'Visa (work/study/tourist/etc)', 
      'Other (please mention in extra info later)'
    ],
    required: true
  },
  maritalHistory: {
    type: String,
    enum: [
      'Not Applicable', 'Married', 'Divorced', 
      'Previously Engaged', 
      'Other (please mention in extra info later)'
    ],
    required: true
  },
  children: {
    type: String,
    enum: ['Yes', 'No', 'Other (please mention in extra info later)'],
    required: true
  },
  relocation: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  revert: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  medicalConditions: {
    type: String,
    enum: ['Yes', 'No'],
    required: true
  },
  languages: [{
    language: {
      type: String,
      required: true
    },
    fluency: {
      type: String,
      required: true
    }
  }],

  // Free Form Details
  aboutMe: {
    type: String,
    required: true
  },
  lookingForDetails: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String,
    required: true
  },

  // Preferences
  preferences: {
    type: String,
    required: true
  },

  // References
  references: [{
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    duration: {
      type: String
    }
  }],

  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const ProfileModel = mongoose.models.profile || mongoose.model('profile', Schema);

export default ProfileModel;