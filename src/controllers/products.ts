import { NextFunction, Request, Response } from "express";

import { Filters, Product, Query } from "../types/Product";
import Products, { ProductDocument } from "../models/Product";

export async function createProduct(request: Request, response: Response, next: NextFunction) {
  const data = new Products(request.body);
  const newProduct = await data.save();
  response.status(201).json(newProduct);
}

export async function productsGetter(
  request: Request,
  response: Response,
  next: NextFunction
) {
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
    response.status(200).json(product);
  } else {
    const _products:Product[] = await Products.find(filters).limit(limit).skip(offset).populate('categoryId').lean().exec();
    response.status(200).json(_products);
  }
  response.end();
}

export async function deleteProduct(request: Request, response: Response, next: NextFunction) {
  console.log(request.params);
  const deletedProd = await Products.findByIdAndDelete(request.params.productId);
  response.sendStatus(204);
}

