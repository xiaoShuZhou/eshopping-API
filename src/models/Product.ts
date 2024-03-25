import mongoose, { Schema } from "mongoose";
import { transformSchema } from "../utils/transform";
import { Product } from "../types/Product";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    require: true,
  },
  categoryId: {
    type: String,
    ref: "Category",
  },
});

ProductSchema.post("save", async function (doc) {
  const Category = mongoose.model("Category");
  await Category.findByIdAndUpdate(doc.categoryId, {
    $addToSet: { productIds: doc._id },
  });
});

transformSchema(ProductSchema);

export type ProductDocument = Document & Product;

export default mongoose.model<ProductDocument>("Products", ProductSchema);
