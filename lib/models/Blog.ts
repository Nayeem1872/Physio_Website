import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  author: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'BlogCategory',
      required: [true, 'Category is required']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    readTime: {
      type: String,
      required: [true, 'Read time is required'],
      trim: true
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug from title before validation if slug is not provided
blogSchema.pre('validate', function () {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
