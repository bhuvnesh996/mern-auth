import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    userType: {
      type: String,
      enum : ['user','admin'],
      default: 'user'
    },

       // Reference to Center schema
    center: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Center',
    },
    
    
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
