import express from "express";
import { createOrder } from "../controllers/order";

const router = express.Router();

router.post("/", createOrder);

export default router;