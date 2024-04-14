import mongoose, { Document } from "mongoose";

import { transformSchema } from "../utils/transform";
import { Category } from "../types/Category";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

transformSchema(CategorySchema);

export type CategoryDocument = Document & Category;
export default mongoose.model<CategoryDocument>("Category", CategorySchema);
