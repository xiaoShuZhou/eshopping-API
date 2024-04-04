import express from "express";
import { getCategoriesHandler, createCategoryHandler, getCategoryByNameHandler, deleteCategoryByNameHandler, updateCategoryHandler } from "../controllers/categories";
import adminCheck from "../middlewares/adminCheck";


const router = express.Router();

router.get("/", getCategoriesHandler);
router.get("/:name", getCategoryByNameHandler);

router.post("/", adminCheck, createCategoryHandler);
router.delete("/:name", adminCheck, deleteCategoryByNameHandler);
router.put("/:name", adminCheck, updateCategoryHandler);

export default router;

