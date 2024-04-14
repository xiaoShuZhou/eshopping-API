import Product, { ProductDocument } from "../models/Product";
import { NotFoundError, InternalServerError } from "../utils/errors/ApiError";

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
    .findById(productId);
  } catch (error) {
    throw new NotFoundError();
  }
}

const getAllProducts = async (): Promise<ProductDocument[]> => {
  try {
    return await
    Product
    .find();
  } catch (error) {
    throw new NotFoundError();
  }
}


// const getProducts = async (filters: Filters): Promise<ProductDocument[]> => {
//   try {
//     return await
//     Product
//     .find(filters);
//   } catch (error) {
//     throw new NotFoundError();
//   }
// }

export default { createProduct, updateProduct, deleteProduct, getProductById, getAllProducts };