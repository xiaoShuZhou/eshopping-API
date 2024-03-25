import { NextFunction, Request, Response } from "express";

import { Filters, Product, Query } from "../types/Product";
import Products, { ProductDocument } from "../models/Product";
import mongoose from "mongoose";

// testing function
export async function getAllProducts(request: Request, response: Response) {
  const count = await Products.estimatedDocumentCount();
  console.log("Length:", count);
  const productList = await Products.find().populate("categoryId");
  console.log(productList);
  response.status(200).json({ products: productList });
}

export async function createProduct(request: Request, response: Response) {
  const data = new Products(request.body);
  const newProduct = await data.save();
  response.status(201).json(newProduct);
}

// let filters: Filters;
// async function filterProds(filters: Filters): Promise<Product[]> {
//   let _products: ProductDocument[] = [];
//   for (const key in filters) {
//     const value = filters[key as keyof Filters]?.toLowerCase();
//     if (value) {
//       if (_products.length > 0) {
//         _products = await Products.find().populate("categoryId").lean().exec();
//       } else {
//         _products = _products.filter((product) =>
//           product[key as keyof Filters]?.includes(value)
//         );
//       }
//     }
//   }
//   return _products;
// }

// export async function productsGetter(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   const prodLen = await Products.estimatedDocumentCount();
//   const {
//     offset = 0,
//     limit = prodLen,
//     title,
//     category,
//     pid,
//   }: Query = request.query;
//   filters = {
//     ...(title && { title }),
//     ...(category && { category }),
//   };
//   if (pid) {
//     const product: Product = (await Products.findById(pid).populate(
//       "categoryId"
//     )) as Product;
//   } else {
//     let _products = filterProds(filters);
//     const end = Math.min(offset + limit, prodLen);
//     _products = _products.slice(offset, end);
//     response.status(200).json(_products);
//   }
//   response.end();
// }

// export async function createProduct(request: Request, response: Response) {
//   const data = new Product(request.body);
//   const newProduct = await productServices.createProduct(data);
//   response.status(201).json(newProduct);
// }

// export function deleteProduct(request: Request, response: Response) {
//   const productId = request.params.productId;
//   products = products.filter((item) => item.id !== productId);
//   response.sendStatus(204);
// }

// export function productsGetter(request: Request, response: Response){
//   Products.find({}).then(products => {response.json(products)});
// }

// export function createProduct(request: Request, response: Response){
//     try {
//       const newProduct: Product = request.body;
//       products.push(newProduct);
//       response.status(201).json(products).end();
//     } catch (e) {
//       response
//         .status(406)
//         .json({ message: "check provided data!", body: request.body })
//         .end();
//     }
//   };

// export function deleteProduct(request: Request, response: Response){

//     const prodLen = products.length;
//     const productId = request.params.productId;
//     products = products.filter((item) => item.id !== productId);
//     const msg = products.length === prodLen ? "Not found" : "Deleted";
//     response.status(204).json({ message: msg, body: products }).end();
//   };
