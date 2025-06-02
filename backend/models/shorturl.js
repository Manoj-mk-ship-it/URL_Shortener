// backend/models/ShortUrl.js
import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
  fullUrl: String,
  shortId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ShortUrl', shortUrlSchema);
