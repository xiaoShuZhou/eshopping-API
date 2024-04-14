import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categories";


const router = express.Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getCategory);
router.post("/", createCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);




export default router;

