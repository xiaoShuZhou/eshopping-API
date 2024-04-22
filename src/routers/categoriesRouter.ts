import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory } from "../controllers/categories";
import passport from "passport";
import adminCheck from "../middlewares/adminCheck";
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:categoryId", getCategory);
router.post("/", passport.authenticate("jwt", { session: false }), adminCheck, createCategory);

router.delete("/:categoryId", passport.authenticate("jwt", { session: false }), adminCheck, deleteCategory);




export default router;

