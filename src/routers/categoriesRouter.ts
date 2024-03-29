import express from "express";
import { getAllCategories, createCategory, getCategoryByName, deleteCategoryByName } from "../controllers/categories";
import adminCheck from "../middlewares/adminCheck";


const router = express.Router();

router.get("/", getAllCategories);
router.post("/", adminCheck, createCategory);
router.get("/:name", getCategoryByName);
router.delete("/:name", adminCheck, deleteCategoryByName);

export default router;
