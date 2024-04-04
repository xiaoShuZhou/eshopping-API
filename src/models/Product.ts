import mongoose, { Document } from "mongoose";
import { transformSchema } from "../utils/transform";
import { ProductDocument } from "../types/Product";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    ref: "Categories",
  },
});

transformSchema(ProductSchema);

export default mongoose.model<ProductDocument>("Products", ProductSchema);
