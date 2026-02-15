import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  profileMedia?: string;
  mediaType?: "image" | "video";
  bannerMedia?: string;
  bannerMediaType?: "image" | "video";
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: Date;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    profileMedia: {
      type: String,
      trim: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    bannerMedia: {
      type: String,
      trim: true,
    },
    bannerMediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role/Occupation is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    testimonial: {
      type: String,
      required: [true, "Testimonial is required"],
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

export default Testimonial;
