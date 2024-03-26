import express from "express";
import { getAllCategories, createCategory, getCategoryByName, deleteCategoryByName } from "../controllers/categories";


const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:name", getCategoryByName);
router.delete("/:name", deleteCategoryByName);

export default router;
