import { NextFunction, Request, Response } from "express";
import { Filters, Product, Query } from "../types/Product";
import Products, { ProductDocument } from "../models/Product";
import { NotFoundError, InternalServerError } from "../errors/ApiError";
import { CreatedResponse, SuccessResponse, NoContentResponse } from "../responses/apiResponse";

export async function createProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const data = new Products(request.body);
    const newProduct = await data.save();
    next(new CreatedResponse<Product>("Product created successfully", newProduct));
  } catch (error) {
    next(new InternalServerError("Failed to create product"));
  }
}

export async function productsGetter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const {
      offset = 0,
      limit = await Products.estimatedDocumentCount(),
      title,
      category,
      pid,
    }: Query = request.query;
    let filters: Filters = {};
    if (title) filters.title = title;
    if (category) filters.category = category;
    if (pid) {
      const product: Product = (await Products.findById(pid).populate("categoryId").lean().exec()) as Product;
      if (!product) {
        next(new NotFoundError("Product not found"));
        return;
      }
      next(new SuccessResponse<Product>("Product found", product));
    } else {
      const _products: Product[] = await Products.find(filters).limit(limit).skip(offset).populate('categoryId').lean().exec();
      next(new SuccessResponse<Product[]>("Products retrieved successfully", _products));
    }
  } catch (error) {
    next(new InternalServerError("Failed to get products"));
  }
}

export async function deleteProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const deletedProd = await Products.findByIdAndDelete(request.params.productId);
    if (!deletedProd) {
      next(new NotFoundError("Product not found"));
      return;
    }
    next(new NoContentResponse("Product deleted successfully"));
  } catch (error) {
    next(new InternalServerError("Failed to delete product"));
  }
}
