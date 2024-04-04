import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import { Filters, ProductDocument } from "../types/Product";
import Products from "../models/Product";

export const createProduct = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return await Products.create(product);
};

export const getProducts = async (query:FilterQuery<Filters>, options?: QueryOptions): Promise<ProductDocument[]> => {
  if(!options) options = {};
  if (!options.limit) options.limit = await Products.estimatedDocumentCount();
  if (!options.skip) options.skip = 0;
  if (!options.populate) options.populate = { path: 'categoryId'};
  if (!options.lean) options.lean = true;
  return await Products.find(query,{},options);
};

export const getProductById = async (
  productId: string,
  options: QueryOptions = { lean: true, populate: { path: 'categoryId'}}
): Promise<ProductDocument | null> => {
  return await Products.findById(productId,{},options);
};

export const deleteProductById = async (
  productId: string
): Promise<ProductDocument | null> => {
  return await Products.findByIdAndDelete(productId);
};

export const updateProduct = async (
  productId: string,
  update: UpdateQuery<ProductDocument>
): Promise<ProductDocument | null> => {
  return await Products.findByIdAndUpdate(productId, update, { new: true });
};

export default {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
};
