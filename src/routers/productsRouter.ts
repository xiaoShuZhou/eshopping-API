import express from "express";
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct,getProductsByFilters} from "../controllers/products";
import passport from "passport";
import adminCheck from "../middlewares/adminCheck";


const router = express.Router();
router.get("/", getAllProducts);
router.get("/filter", getProductsByFilters);
router.get("/:productId", getProduct);
router.post("/",passport.authenticate("jwt", { session: false }),adminCheck, createProduct);
router.put("/:productId", passport.authenticate("jwt", { session: false }),adminCheck,updateProduct);
router.delete("/:productId", passport.authenticate("jwt", { session: false }),adminCheck,deleteProduct);





export default router;
