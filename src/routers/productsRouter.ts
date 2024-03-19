import express from "express";

// import products from '../data/products.json';
import { Filters, Product, Query } from "../types/Product";
import { productsGetter } from "../resolvers/products";

const router = express.Router();
let filters: Filters;
let products: Product[] = [
  { id: "1", name: "product1", category: "1", variant: "1", price: 1 },
  { id: "2", name: "product2", category: "2", variant: "1", price: 2 },
  { id: "3", name: "product3", category: "1", variant: "2", price: 3 },
];


router.get("/", productsGetter);

// router.post("/", createProduct);

// router.delete("/:productId", deleteProduct);

export default router;
