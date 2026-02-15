import mongoose, { Document, Schema } from "mongoose";

export interface ILeadership extends Document {
  name: string;
  position: string;
  role: "chairman" | "ceo" | "other";
  quote: string;
  image?: string;
  badge?: string;
  icon?: string;
  order?: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const leadershipSchema = new Schema<ILeadership>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["chairman", "ceo", "other"],
      required: [true, "Role is required"],
    },
    quote: {
      type: String,
      required: [true, "Quote is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
      default: "Reflex Physiotherapy",
    },
    icon: {
      type: String,
      trim: true,
      default: "award",
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

const Leadership = mongoose.models.Leadership || mongoose.model<ILeadership>("Leadership", leadershipSchema);

export default Leadership;
