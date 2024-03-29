import express from "express";
import { createOrder, deleteOrder } from "../controllers/order";

const router = express.Router();

router.post("/", createOrder);

router.delete("/:orderId", deleteOrder);

export default router;