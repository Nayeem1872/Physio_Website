import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  category: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  duration: string;
  pricing: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceCategory',
      required: [true, 'Service category is required']
    },
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true
    },
    detailedDescription: {
      type: String,
      required: [true, 'Detailed description is required'],
      trim: true
    },
    keyBenefits: {
      type: [String],
      required: [true, 'Key benefits are required'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one key benefit is required'
      }
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true
    },
    pricing: {
      type: String,
      required: [true, 'Pricing is required'],
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    published: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug from name before validation
serviceSchema.pre('validate', function () {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const Service = mongoose.models.Service || mongoose.model<IService>('Service', serviceSchema);

export default Service;
