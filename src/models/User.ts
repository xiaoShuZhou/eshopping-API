import mongoose, { Document } from 'mongoose';

import { User } from '../types/User';

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin"]
  },
  avatar: {
    type: String,
  }
});

export type UserDocument = Document & User;

export default mongoose.model<UserDocument>('User', UserSchema);