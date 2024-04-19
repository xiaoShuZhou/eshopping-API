import express from "express";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct,getProductsByFilters} from "../controllers/products";



const router = express.Router();
router.get("/", getAllProducts);
router.get("/filter", getProductsByFilters);
router.get("/:productId", getProduct);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);





export default router;
