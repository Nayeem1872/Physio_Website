import mongoose, { Document, Schema } from "mongoose";

export interface IBanner extends Document {
  section: "hero" | "about";
  images: string[];
  title?: string;
  subtitle?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    section: {
      type: String,
      required: [true, "Section is required"],
      enum: ["hero", "about"],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: "At least one image is required",
      },
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.models.Banner || mongoose.model<IBanner>('Banner', bannerSchema);

export default Banner;
