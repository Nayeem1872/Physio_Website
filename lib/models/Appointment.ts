import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  service: string;
  preferredDate: Date;
  preferredTime: string;
  appointmentType: 'in-person' | 'online' | 'home-visit';
  urgency: 'normal' | 'urgent' | 'emergency';
  previousTreatment: boolean;
  insuranceProvider?: string;
  referralSource?: string;
  symptoms: string;
  medicalHistory?: string;
  currentMedications?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true
    },
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required']
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
      trim: true
    },
    appointmentType: {
      type: String,
      enum: ['in-person', 'online', 'home-visit'],
      required: [true, 'Appointment type is required']
    },
    urgency: {
      type: String,
      enum: ['normal', 'urgent', 'emergency'],
      default: 'normal'
    },
    previousTreatment: {
      type: Boolean,
      default: false
    },
    insuranceProvider: {
      type: String,
      trim: true
    },
    referralSource: {
      type: String,
      trim: true
    },
    symptoms: {
      type: String,
      required: [true, 'Symptoms are required'],
      trim: true
    },
    medicalHistory: {
      type: String,
      trim: true
    },
    currentMedications: {
      type: String,
      trim: true
    },
    emergencyContactName: {
      type: String,
      required: [true, 'Emergency contact name is required'],
      trim: true
    },
    emergencyContactPhone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
      trim: true
    },
    emergencyContactRelation: {
      type: String,
      required: [true, 'Emergency contact relation is required'],
      trim: true
    },
    agreeToTerms: {
      type: Boolean,
      required: [true, 'You must agree to terms'],
      validate: {
        validator: function (v: boolean) {
          return v === true;
        },
        message: 'You must agree to terms and conditions'
      }
    },
    agreeToPrivacy: {
      type: Boolean,
      required: [true, 'You must agree to privacy policy'],
      validate: {
        validator: function (v: boolean) {
          return v === true;
        },
        message: 'You must agree to privacy policy'
      }
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
