import mongoose, { Schema } from "mongoose";
import { transformSchema } from "../utils/transform";

const ProductSchema = new mongoose.Schema({
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  });

  transformSchema(ProductSchema);

export default mongoose.model("Products", ProductSchema);