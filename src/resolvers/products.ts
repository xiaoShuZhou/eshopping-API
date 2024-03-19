import { Request, Response } from "express";
import { Filters, Product, Query } from "../types/Product";
import Products from "../models/Product";

let filters: Filters;
function filterProds(filters: Filters, _products: Product[]): Product[] {
    for (const key in filters) {
      const value = filters[key as keyof Filters]?.toLowerCase();
      if (value) {
        _products = _products.filter((product) =>
          product[key as keyof Filters]?.includes(value)
        );
      }
    }
    return _products;
  }

// export function productsGetter(request: Request, response: Response){
//     const prodLen = products.length;
//     const {
//       offset = 0,
//       limit = prodLen,
//       name,
//       category,
//       variant,
//       pid,
//     }: Query = request.query;
  
//     filters = {
//       ...(name && { name }),
//       ...(category && { category }),
//       ...(variant && { variant }),
//     };
  
//     if (pid) {
//       const product = products.find((p) => p.id === pid);
//       if (!product) {
//         response.status(404).json({ error: "Product not found" });
//       } else {
//         response.status(200).json(product);
//       }
//     } else {
//       let _products = filterProds(filters, products);
//       const end = Math.min(offset + limit, prodLen);
//       _products = _products.slice(offset, end);
//       response.status(200).json(_products);
//     }
//     response.end();
//   };

export function productsGetter(request: Request, response: Response){
  Products.find({}).then(products => {response.json(products)});
}

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