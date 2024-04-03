import express from "express";
import {createOrderItem, updateOrderItemQuantity,deleteOrderItem,getAllOrderItems,getOrderItem} from "../controllers/orderItem";


const router = express.Router();

router.post("/", createOrderItem);

router.put("/:orderItemId", updateOrderItemQuantity);

router.get("/", getAllOrderItems);

router.get("/:orderItemId", getOrderItem);

router.delete("/:orderItemId", deleteOrderItem);

export default router;