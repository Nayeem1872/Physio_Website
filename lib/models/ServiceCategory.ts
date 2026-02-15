import mongoose, { Document, Schema } from 'mongoose';

export interface IServiceCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceCategorySchema = new Schema<IServiceCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug from name before validation
serviceCategorySchema.pre('validate', function () {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const ServiceCategory = mongoose.models.ServiceCategory || mongoose.model<IServiceCategory>('ServiceCategory', serviceCategorySchema);

export default ServiceCategory;
