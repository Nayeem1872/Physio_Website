import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  service: string;
  preferredDate?: Date;
  preferredTime?: string;
  appointmentType?: 'in-person' | 'online' | 'home-visit';
  urgency: 'normal' | 'urgent' | 'emergency';
  previousTreatment: boolean;
  insuranceProvider?: string;
  referralSource?: string;
  symptoms?: string;
  medicalHistory?: string;
  currentMedications?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  agreeToTerms?: boolean;
  agreeToPrivacy?: boolean;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
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
      type: Date
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true
    },
    preferredDate: {
      type: Date
    },
    preferredTime: {
      type: String,
      trim: true
    },
    appointmentType: {
      type: String,
      enum: ['in-person', 'online', 'home-visit'],
      default: 'in-person'
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
      trim: true
    },
    emergencyContactPhone: {
      type: String,
      trim: true
    },
    emergencyContactRelation: {
      type: String,
      trim: true
    },
    agreeToTerms: {
      type: Boolean,
      default: true
    },
    agreeToPrivacy: {
      type: Boolean,
      default: true
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

if (mongoose.models.Appointment) {
  delete mongoose.models.Appointment;
}
const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
