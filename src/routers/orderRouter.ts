import express from "express";
import { createOrder, deleteOrder, updateOrder } from "../controllers/order";

const router = express.Router();

router.post("/", createOrder);

router.delete("/:orderId", deleteOrder);

router.put("/:orderId", updateOrder);


export default router;