import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogCategory extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogCategorySchema = new Schema<IBlogCategory>(
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
    }
  },
  {
    timestamps: true
  }
);

// Generate slug from name before validation
blogCategorySchema.pre('validate', function () {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const BlogCategory = mongoose.models.BlogCategory || mongoose.model<IBlogCategory>('BlogCategory', blogCategorySchema);

export default BlogCategory;
