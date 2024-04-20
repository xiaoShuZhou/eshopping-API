import express from "express";
import {createOrderItem, increaseOrderItemQuantity,decreaseOrderItemQuantity,deleteOrderItem} from "../controllers/orderItem";
import passport from "passport";

const router = express.Router();

router.post("/", createOrderItem);

router.put("/increase/:orderItemId", increaseOrderItemQuantity);

router.put("/decrease/:orderItemId", decreaseOrderItemQuantity);

router.delete("/:orderId/items/:orderItemId", deleteOrderItem);


export default router;