import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimetype: { type: String, default: '' },
    size: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Media = mongoose.model('Media', MediaSchema);
