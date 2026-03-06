import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', ServiceSchema);
