import mongoose, { Document } from "mongoose";

import { transformSchema } from "../utils/transform";
import { Category } from "../types/Product";

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

export type CategoryDocument = Document & Category;

export default mongoose.model<CategoryDocument>("Categories", CategorySchema);
