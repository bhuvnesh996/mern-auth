import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const News = mongoose.model('News', newsSchema);

export default News;
