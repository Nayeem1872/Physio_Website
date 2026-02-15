import mongoose, { Document, Schema } from "mongoose";

export interface IMilestone extends Document {
  year: string;
  title: string;
  description: string;
  order?: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const milestoneSchema = new Schema<IMilestone>(
  {
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Milestone = mongoose.models.Milestone || mongoose.model<IMilestone>('Milestone', milestoneSchema);

export default Milestone;
