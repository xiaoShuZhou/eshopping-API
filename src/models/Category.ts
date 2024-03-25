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
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
  }]
});

transformSchema(CategorySchema);

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
