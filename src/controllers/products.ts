import { NextFunction, Request, Response } from "express";
import { Filters, ProductDocument, Query } from "../types/Product";
import Products from "../models/Product";
import { NotFoundError, InternalServerError } from "../errors/ApiError";
import {
  CreatedResponse,
  SuccessResponse,
  NoContentResponse,
} from "../responses/apiResponse";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/product.service";
import { ProductInput } from "../schema/product.schema";

export async function createProductHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const productInput: ProductInput["body"] = request.body;
    const newProduct = await createProduct(new Products(productInput));
    next(
      new CreatedResponse<ProductDocument>(
        "Product created successfully",
        newProduct
      )
    );
  } catch (error) {
    next(new InternalServerError("Failed to create product"));
  }
}

export async function getProductsHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { limit, skip, title, categoryId, pid }: Query = request.query;
    let filters: Filters = {};
    if (title) filters.title = title;
    if (categoryId) filters.categoryId = categoryId;
    if (pid) {
      const product = await getProductById(pid);
      if (!product) {
        next(new NotFoundError("Product not found"));
        return;
      }
      next(new SuccessResponse<ProductDocument>("Product found", product));
    } else {
      const _products: ProductDocument[] = await getProducts(filters);
      if (_products.length > 0) {
        next(
          new SuccessResponse<ProductDocument[]>(
            "Products retrieved successfully",
            _products
          )
        );
      } else {
        next(new NotFoundError("No such product"));
      }
    }
  } catch (error) {
    next(new InternalServerError("Failed to get products"));
  }
}

export async function deleteProductHandler(
  request: Request<ProductInput["params"]>,
  response: Response,
  next: NextFunction
) {
  try {
    const deletedProd = deleteProductById(request.params.productId);
    if (!deletedProd) {
      next(new NotFoundError("Product not found"));
      return;
    }
    next(new NoContentResponse("Product deleted successfully"));
  } catch (error) {
    next(new InternalServerError("Failed to delete product"));
  }
}

export async function updateProductHandler(
  request: Request<ProductInput["params"], {}, ProductInput["body"]>,
  response: Response,
  next: NextFunction
) {
  try {
    const productId = request.params.productId;
    const updatedProduct = await updateProduct(productId, request.body);
    if (!updatedProduct) {
      next(new NotFoundError("Product not found"));
      return;
    }
    next(
      new SuccessResponse<ProductDocument>(
        "Product updated successfully",
        updatedProduct
      )
    );
  } catch (error) {
    next(new InternalServerError("Failed to update product"));
  }
}
