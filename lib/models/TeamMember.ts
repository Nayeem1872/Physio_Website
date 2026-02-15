import mongoose, { Document, Schema } from "mongoose";

export interface ITeamMember extends Document {
  profileImage?: string;
  fullName: string;
  title: string;
  specialization: string;
  experience: string;
  education: string;
  certifications?: string[];
  specialties?: string[];
  biography: string;
  email: string;
  phone: string;
  availability: string;
  languages: string[];
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    profileImage: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
    },
    education: {
      type: String,
      required: [true, "Education is required"],
      trim: true,
    },
    certifications: {
      type: [String],
      default: [],
    },
    specialties: {
      type: [String],
      default: [],
    },
    biography: {
      type: String,
      required: [true, "Biography is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    availability: {
      type: String,
      required: [true, "Availability is required"],
      trim: true,
    },
    languages: {
      type: [String],
      required: [true, "At least one language is required"],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: "At least one language is required",
      },
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);

export default TeamMember;
