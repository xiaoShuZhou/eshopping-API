import express from "express";
import {createOrderItem, updateOrderItemQuantity,deleteOrderItem} from "../controllers/orderItem";


const router = express.Router();

router.post("/", createOrderItem);

router.put("/:orderItemId", updateOrderItemQuantity);

router.delete("/:orderItemId", deleteOrderItem);

export default router;