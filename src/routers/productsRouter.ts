import express from "express";

import { Filters, Product, Query } from "../types/Product";
import { productsGetter, createProduct, deleteProduct } from "../controllers/products";
import adminCheck from "../middlewares/adminCheck";

const router = express.Router();

router.get("/", productsGetter);
// router.post("/", adminCheck, createProduct);
router.post("/", createProduct);
router.delete("/:productId", adminCheck, deleteProduct);

export default router;
