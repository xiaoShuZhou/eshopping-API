import { BadRequest } from "../errors/ApiError";
import Category from "../models/Category";
import { ProductInput, ProductSchema } from "../schema/product.schema";

export async function validateCategory(input: ProductInput["body"]){
  const { categoryId } = input;
  if (categoryId) {
    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      throw new BadRequest("Invalid categoryId: no such category")
    }
  }
}
