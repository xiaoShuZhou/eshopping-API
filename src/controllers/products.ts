import { NextFunction, Request, Response } from "express";
import { NotFoundError, InternalServerError } from "../utils/errors/ApiError";
import productsService from "../services/productService";
import Product from "../models/Product";

export const getAllProducts = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const products = await productsService.getAllProducts();
    response.status(200).json(products);
  } catch (error) {
    next(new InternalServerError());
  }
} 

export const getProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product = await productsService.getProductById(request.params.productId);
    if (!product) {
      response.status(404).json({ message: "Product not found" });
      return;
    }
    response.status(200).json(product);
  } catch (error) {
    next(new InternalServerError());
  }
}

export const createProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const productData = new Product(request.body);
    const product = await productsService.createProduct(productData);
    response.status(201).json(product);
  } catch (error) {
    next(new InternalServerError());
  }
}

export const updateProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const updatedProduct = await productsService.updateProduct(request.params.productId, request.body);
    if (!updatedProduct) {
      response.status(404).json({ message: "Product not found" });
      return;
    }
    response.status(200).json(updatedProduct);
  } catch (error) {
    next(new InternalServerError());
  }
}

export const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const deleted = await productsService.deleteProduct(request.params.productId);
    if (!deleted) {
      response.status(404).json({ message: "Product not found" });
      return;
    }
    response.status(204).send();
  } catch (error) {
    next(new InternalServerError());
  }
}




