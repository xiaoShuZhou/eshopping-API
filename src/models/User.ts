import mongoose, { Document } from 'mongoose';

import { User } from '../types/User';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin"],
    default: "customer",
  },
  avatar: {
    type: String,
  }
});

export type UserDocument = Document & User;

export default mongoose.model<UserDocument>('User', UserSchema);