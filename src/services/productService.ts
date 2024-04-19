import Product, { ProductDocument } from "../models/Product";
import { NotFoundError, InternalServerError } from "../utils/errors/ApiError";
import { FilterQuery } from "mongoose";
import { FilterParams } from "../types/Product";

const createProduct = async (productData: ProductDocument): Promise<ProductDocument> => {
  try {
    return await productData.save();
  } catch (error) {
    throw new Error("Failed to create product");
  }
}

const updateProduct = async (productId: string, productData: Partial<ProductDocument>): Promise<ProductDocument | null> => {
  try {
    return await Product.findByIdAndUpdate
    (productId, productData, { new: true });
  } catch (error) {
    throw new NotFoundError();
  }
}

const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const deletedProduct = await
    Product
    .findByIdAndDelete(productId);
    return !!deletedProduct;
  } catch (error) {
    throw new NotFoundError();
  }
}

const getProductById = async (productId: string): Promise<ProductDocument | null> => {
  try {
    return await
    Product
    .findById(productId).populate("category")
  } catch (error) {
    throw new NotFoundError();
  }
}

const getAllProducts = async (): Promise<ProductDocument[]> => {
  try {
    return await
    Product
    .find().populate("category");
  } catch (error) {
    throw new NotFoundError();
  }
}




const getProductsByFilters = async (filters: FilterParams): Promise<ProductDocument[]> => {
  const query: FilterQuery<ProductDocument> = {};

  if (filters.title) {
    query.title = { $regex: filters.title, $options: "i" }; // Case-insensitive search
  }
  if (filters.priceMin !== undefined) {
    query.price = { ...query.price, $gte: filters.priceMin };
  }
  if (filters.priceMax !== undefined) {
    query.price = { ...query.price, $lte: filters.priceMax };
  }
  if (filters.categoryId !== undefined) {
    query.category = filters.categoryId;
  }

  try {
    return await Product.find(query).populate("category");
  } catch (error) {
    throw new InternalServerError();
  }
}



export default { createProduct, updateProduct, deleteProduct, getProductById, getAllProducts, getProductsByFilters};