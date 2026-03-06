import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', CategorySchema);
