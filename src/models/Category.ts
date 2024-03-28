import mongoose, { Document } from "mongoose";

import { transformSchema } from "../utils/transform";

export type CategoryDocument = Document;

export const CategorySchema = new mongoose.Schema({
  _id: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

transformSchema(CategorySchema);

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
