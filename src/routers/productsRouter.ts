import express from "express";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct,postImage } from "../controllers/products";
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = express.Router();
router.get("/", getAllProducts);
router.get("/:productId", getProduct);
router.post("/", upload.single('image'),createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.post("/image", upload.single('avatar'),postImage);




export default router;
