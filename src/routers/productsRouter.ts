import express from "express";

import adminCheck from "../middlewares/adminCheck";
import { createProductHandler, deleteProductHandler, getProductsHandler, updateProductHandler } from "../controllers/products";

const router = express.Router();

router.get("/", getProductsHandler);

router.post("/", adminCheck, createProductHandler);
router.delete("/:productId", adminCheck, deleteProductHandler);
router.put("/:productId", adminCheck, updateProductHandler);

export default router;
