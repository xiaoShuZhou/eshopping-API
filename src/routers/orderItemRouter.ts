import express from "express";
import {createOrderItem, deleteOrderItem} from "../controllers/orderItem";


const router = express.Router();

router.post("/", createOrderItem);
router.put("/", createOrderItem);
router.delete("/:orderItemId", deleteOrderItem);

export default router;