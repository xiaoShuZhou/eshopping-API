import express from "express";

import { Filters, Product, Query } from "../types/Product";
import { productsGetter, createProduct, deleteProduct } from "../controllers/products";

const router = express.Router();

router.get("/", productsGetter);
router.post("/", createProduct);
router.delete("/:productId", deleteProduct);

export default router;
