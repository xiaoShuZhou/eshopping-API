import mongoose, { Document } from "mongoose";

import { transformSchema } from "../utils/transform";

export type CategoryDocument = Document;

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  productIds: {
    type: [String],
  }
});

transformSchema(CategorySchema);

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
