import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
      trim: true
    },
    category: {
      type: String,
      trim: true,
      default: 'General'
    },
    order: {
      type: Number,
      default: 0
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

const FAQ = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', faqSchema);

export default FAQ;
