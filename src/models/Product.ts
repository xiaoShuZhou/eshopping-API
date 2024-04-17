import mongoose, { Document } from "mongoose";
import { transformSchema } from "../utils/transform";
import { Product } from "../types/Product";

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
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

transformSchema(ProductSchema);

export type ProductDocument = Document & Product;
export default mongoose.model<ProductDocument>("Product", ProductSchema);
