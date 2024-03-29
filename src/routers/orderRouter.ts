import express from "express";
import { createOrder, deleteOrder, updateOrder, getAllOrders, findOrderById } from "../controllers/order";

const router = express.Router();

router.post("/", createOrder);

router.delete("/:orderId", deleteOrder);

router.put("/:orderId", updateOrder);

router.get("/", getAllOrders);

router.get("/:orderId", findOrderById);


export default router;